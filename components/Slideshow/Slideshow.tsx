import { Box, Flex } from "@radix-ui/themes";
import type { PageBlocksSlideshow } from "../../tina/__generated__/types";
import type { Ref } from "react";
import useSlideshow from "./hook";
import { renderBlocks } from "../../tina/templating/utils";
import useBreakpoint from "../../utils/hook/useBreakpoint";
import { findBreakpointValue } from "../../tina/templating/special-fields";
import styles from "./Slideshow.module.css";

export default function Component(props: PageBlocksSlideshow) {
  const breakpoint = useBreakpoint();
  const numberOfSlidesShown = findBreakpointValue(
    breakpoint,
    "numberOfSlidesShown",
  );

  const { slideshow, scrollToSlide, activeSlide } = useSlideshow({
    numberOfSlides: props.content?.blocks?.length,
    numberOfSlidesShown: props.settings?.[numberOfSlidesShown] ?? 1,
    nextSlideTimeout: Number((props.settings as any)?.nextSlideTimeout) || null,
  });

  return (
    <Box
      mt={props.settings?.marginTop ?? "inherit"}
      mb={props.settings?.marginBottom ?? "inherit"}
      px={props.settings?.paddingX ?? "0"}
      py={props.settings?.paddingY ?? "0"}
      className={styles.slideshowContainer}
    >
      <Flex
        overflowX="auto"
        overflowY="hidden"
        wrap="nowrap"
        ref={slideshow as Ref<HTMLDivElement>}
        className={styles.slideScroller}
      >
        {props.content?.blocks?.map((slide, index) => (
          <Box
            key={index}
            flexShrink={"0"}
            width={"100%"}
            className={styles.slide}
          >
            {renderBlocks(slide, index)}
          </Box>
        ))}
      </Flex>

      {props.settings?.hasControls !== false && (
        <Box p={"2"} mt={"-8"} mb={"0"} className={styles.controlsContainer}>
          <Flex>
            {props.content?.blocks?.map((block, index) => {
              const isActive = activeSlide === index + 1;
              return (
                <Box
                  onClick={() => {
                    scrollToSlide(index + 1);
                  }}
                  key={index}
                  mx={"1"}
                  className={`${styles.controlDot} ${
                    isActive
                      ? styles.controlDotActive
                      : styles.controlDotInactive
                  }`}
                />
              );
            })}
          </Flex>
        </Box>
      )}
    </Box>
  );
}
