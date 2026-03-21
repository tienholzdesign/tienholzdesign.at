import { Box, Flex } from "@radix-ui/themes";
import type { PageBlocksSlideshow } from "../../tina/__generated__/types";
import type { Ref } from "react";
import useSlideshow from "./hook";
import { renderBlocks } from "../../tina/templating/utils";
import useBreakpoint from "../../utils/hook/useBreakpoint";
import { findBreakpointValue } from "../../tina/templating/special-fields";
import styles from "./Slideshow.module.css";
import { themeConfig } from "../../config/theme-config";

export default function Component(props: PageBlocksSlideshow) {
  const breakpoint = useBreakpoint();
  const numberOfSlidesShown = findBreakpointValue(
    breakpoint,
    "numberOfSlidesShown",
  );

  const { slideshow, scrollToSlide, activeSlide } = useSlideshow({
    numberOfSlides: props?.blocks?.length,
    numberOfSlidesShown: props.settings?.[numberOfSlidesShown] ?? 1,
    nextSlideTimeout: Number((props.settings as any)?.nextSlideTimeout) || null,
  });

  return (
    <Box
      mt={props.settings?.mt ?? "0"}
      mb={props.settings?.mb ?? themeConfig.layout.padding}
      className={styles.slideshowContainer}
    >
      <Flex
        overflowX="auto"
        overflowY="hidden"
        wrap="nowrap"
        ref={slideshow as Ref<HTMLDivElement>}
        className={styles.slideScroller}
      >
        {props.blocks?.map((slide, index) => (
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

      <Box p={"2"} mt={"-9"} mb={"0"} className={styles.controlsContainer}>
        <Flex>
          {props.blocks?.map((block, index) => {
            const isActive = activeSlide === index + 1;
            return (
              <Box
                onClick={() => {
                  scrollToSlide(index + 1);
                }}
                key={index}
                mx={"1"}
                className={`${styles.controlDot} ${
                  isActive ? styles.controlDotActive : styles.controlDotInactive
                }`}
              />
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
