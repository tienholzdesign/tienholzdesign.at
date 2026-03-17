import {
  Flex,
  Box,
  Popover,
  Button as RadixButton,
  Container,
  Grid,
} from "@radix-ui/themes";
import type { NavigationQuery } from "../../tina/__generated__/types";
import Text from "../Text/Text";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import NextImage from "next/image";
import Link from "next/link";
import { themeConfig } from "../../config/theme-config";
import { tinaField } from "tinacms/dist/react";

export default function Navigation(props: NavigationQuery["navigation"]) {
  return (
    <Container
      px={{
        initial: themeConfig.layout.defaultPadding,
        md: "0",
      }}
      style={{
        borderBottom: "1px solid var(--gray-6)",
      }}
    >
      <Grid
        columns={themeConfig.layout.defaultGridColumns}
        gap={{ initial: "0", md: themeConfig.layout.defaultPadding }}
      >
        <Flex justify={"between"} className="test">
          {/* TODO add class to all hidden links */}
          <Link
            href={"/"}
            className="no-line-height"
            data-tina-field={tinaField(props, "logo")}
          >
            {props.logo?.logoImage ? (
              <NextImage
                src={props.logo.logoImage}
                alt="Logo"
                width={40}
                height={40}
                style={{ margin: 0 }}
              />
            ) : (
              <Text {...(props.logo as any)} />
            )}
          </Link>
          <Box display={{ initial: "block", md: "none" }}>
            <Popover.Root>
              <Popover.Trigger>
                <RadixButton mt={"1"} aria-label="Open navigation menu">
                  <HamburgerMenuIcon />
                </RadixButton>
              </Popover.Trigger>
              <Popover.Content side="bottom" align="end">
                <Flex
                  direction="column"
                  gap={themeConfig.layout.defaultPadding}
                >
                  {props.links?.map((link, index) => {
                    return <Text key={index} {...(link as any)} />;
                  })}
                </Flex>
              </Popover.Content>
            </Popover.Root>
          </Box>
        </Flex>

        <Flex
          className="test"
          gridColumn="span 2"
          display={{ initial: "none", md: "flex" }}
          direction={"row"}
          justify={"between"}
        >
          {props.links?.map((link, index) => {
            return <Text key={index} {...(link as any)} />;
          })}
        </Flex>
      </Grid>
    </Container>
  );
}
