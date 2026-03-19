import { AspectRatio, Flex, Box } from "@radix-ui/themes";
import NextImage from "next/image";
import { aspectRatioMap } from "../../tina/templating/granular-fields";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksImage } from "../../tina/__generated__/types";
import useBreakpoint from "../../utils/hook/useBreakpoint";
import { renderBlocks } from "../../tina/templating/utils";
import { findBreakpointValue } from "../../tina/templating/special-fields";
import styles from "./Image.module.css";
import { LinkWrapper } from "../helpers";
import { themeConfig } from "../../config/theme-config";

export default function Component(props: PageBlocksImage) {
  const breakpoint = useBreakpoint();
  const aspectRatio = findBreakpointValue(breakpoint, "aspectRatio");

  const isExternalLink = props.content?.link?.startsWith("http");

  const content = (
    <AspectRatio
      data-tina-field={tinaField(props.content ?? props)}
      ratio={aspectRatioMap[props.settings?.[aspectRatio]] ?? 16 / 9}
      className={styles.aspectRatioContainer}
    >
      <NextImage
        src={
          props.content?.image !== undefined &&
          props.content?.image !== null &&
          props.content?.image !== ""
            ? props.content.image
            : "/uploads/placeholders/gradient.jpg"
        }
        blurDataURL={props.content?.blurImage ?? undefined}
        placeholder={props.content?.blurImage ? "blur" : "empty"}
        fill
        alt={"Image content"}
        role={"presentation"}
        className={styles.imageContent}
      />
      <Flex
        direction={"column"}
        className={styles.overlayContainer}
        justify={"start"}
      >
        {props.content?.blocks?.map((block, j) => {
          return renderBlocks(block, j);
        })}
      </Flex>
    </AspectRatio>
  );

  return (
    <Box
      mt={props.settings?.mt ?? "0"}
      mb={props.settings?.mb ?? themeConfig.layout.padding}
    >
      <LinkWrapper link={props.content?.link ?? ""} content={content} />
    </Box>
  );
}
