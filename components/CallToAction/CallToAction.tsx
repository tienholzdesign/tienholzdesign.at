import { Box, Card, Container, Flex } from "@radix-ui/themes";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksCall_To_Action } from "../../tina/__generated__/types";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import Text from "../Text/Text";
import Link from "next/link";
import styles from "./CallToAction.module.css";

export default function Component(props: PageBlocksCall_To_Action) {
  const content = (
    <Card className={styles.ctaBackground}>
      <Flex
        direction={{
          initial: props.settings?.direction_initial as any,
          xs: props.settings?.direction_xs as any,
          sm: props.settings?.direction_sm as any,
          md: props.settings?.direction_md as any,
          lg: props.settings?.direction_lg as any,
          xl: props.settings?.direction_xl as any,
        }}
        p={"4"}
        gap="4"
        align={{
          initial:
            (props.settings?.direction_initial as any) === "row"
              ? "center"
              : undefined,
          xs:
            (props.settings?.direction_xs as any) === "row"
              ? "center"
              : undefined,
          sm:
            (props.settings?.direction_sm as any) === "row"
              ? "center"
              : undefined,
          md:
            (props.settings?.direction_md as any) === "row"
              ? "center"
              : undefined,
          lg:
            (props.settings?.direction_lg as any) === "row"
              ? "center"
              : undefined,
          xl:
            (props.settings?.direction_xl as any) === "row"
              ? "center"
              : undefined,
        }}
        data-tina-field={tinaField(props.content ?? props)}
      >
        <Box width={{ initial: "100%", md: "75%" }}>
          <Heading
            content={{
              text_de: props.content?.heading_de,
              text_en: props.content?.heading_en,
            }}
            settings={{ marginBottom: "4" }}
          />
          <Text
            content={{
              text_de: props.content?.text_de,
              text_en: props.content?.text_en,
            }}
            settings={{ marginBottom: "1", paddingX: "0" }}
          />
        </Box>
        <Box width={{ initial: "100%", md: "25%" }}>
          <Flex direction="column" gap="2">
            {props.content?.buttonText_de || props.content?.buttonText_en ? (
              <Link href={props.content?.buttonLink || "/"}>
                <Button
                  content={{
                    text_de: props.content?.buttonText_de,
                    text_en: props.content?.buttonText_en,
                  }}
                />
              </Link>
            ) : null}
            {props.content?.buttonText1_de || props.content?.buttonText1_en ? (
              <Link href={props.content?.buttonLink1 || "/"}>
                <Button
                  content={{
                    text_de: props.content?.buttonText1_de,
                    text_en: props.content?.buttonText1_en,
                  }}
                />
              </Link>
            ) : null}
          </Flex>
        </Box>
      </Flex>
    </Card>
  );

  const box = (
    <Box
      id={props.settings?.id || undefined}
      mt={props.settings?.marginTop ?? "inherit"}
      mb={props.settings?.marginBottom ?? "inherit"}
      px={props.settings?.paddingX ?? "0"}
      py={props.settings?.paddingY ?? "0"}
    >
      {content}
    </Box>
  );

  return props.settings?.hasContainer !== false ? (
    <Container
      px={{
        initial: "4",
        xs: "4",
        sm: "4",
      }}
    >
      {box}
    </Container>
  ) : (
    box
  );
}
