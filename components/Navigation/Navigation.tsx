import {
  Flex,
  Box,
  Popover,
  Button as RadixButton,
  Container,
} from "@radix-ui/themes";
import type { NavigationQuery } from "../../tina/__generated__/types";
import Text from "../Text/Text";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import NextImage from "next/image";
import Link from "next/link";

export default function Navigation(props: NavigationQuery["navigation"]) {
  return (
    <Box
      style={{ borderBottom: "1px solid var(--color-border-light)" }}
      mb={"9"}
      px={props.settings?.paddingX ?? "0"}
      py={props.settings?.paddingY ?? "0"}
    >
      <Container>
        <Flex direction={"row"} justify="between" align={"center"}>
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <Box>
              {props.logoImage ? (
                <NextImage
                  src={props.logoImage}
                  alt="Logo"
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <Text {...(props.logo as any)} underline={false} />
              )}
            </Box>
          </Link>

          <Box display={{ initial: "block", md: "none" }} mr={"4"}>
            <Popover.Root>
              <Popover.Trigger>
                <RadixButton
                  variant="ghost"
                  size="4"
                  mt={"1"}
                  aria-label="Open navigation menu"
                >
                  <HamburgerMenuIcon />
                </RadixButton>
              </Popover.Trigger>
              <Popover.Content
                style={{
                  width: "fit-content",
                  background: "var(--color-background)",
                }}
                side="bottom"
                align="end"
              >
                <Flex direction="column" gap="4">
                  {props.links?.map((link, index) => {
                    return (
                      <Text key={index} {...(link as any)} underline={false} />
                    );
                  })}
                </Flex>
              </Popover.Content>
            </Popover.Root>
          </Box>

          <Flex
            display={{ initial: "none", md: "flex" }}
            direction={"row"}
            align={"center"}
            gap={"8"}
          >
            {props.links?.map((link, index) => {
              return (
                <div style={{ textTransform: "uppercase" }}>
                  <Text key={index} {...(link as any)} underline={false} />
                </div>
              );
            })}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
