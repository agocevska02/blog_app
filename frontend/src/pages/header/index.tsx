"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronRightIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo";

export default function DesktopNavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const user = localStorage.getItem("user") || null;
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Box
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            onClick={() => (window.location.href = "/")}
          >
            <Logo />
          </Box>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Navigation />
          </Flex>
        </Flex>

        <Button onClick={toggleColorMode} mr="4">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!user ? (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/login"}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"teal.600"}
                href={"/signup"}
                _hover={{
                  bg: "teal.500",
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"teal.600"}
              href={"/"}
              _hover={{
                bg: "teal.500",
              }}
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Log out
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}

const Navigation = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Stack direction={"row"} spacing={4} alignItems={"center"}>
      {NAV_ITEMS.map((navItem) => {
        if (navItem.authenticated && !user) return null;
        if (navItem.roles && !navItem.roles.includes(user?.role)) return null;

        return (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Box
                  as="a"
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Box>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <SubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
};

const SubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <ChevronRightIcon color={"teal.400"} w={5} h={5} />
        </Flex>
      </Stack>
    </Box>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  authenticated?: boolean;
  roles?: string[];
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Blogs",
    href: "/",
  },
  {
    label: "My Profile",
    children: [
      {
        label: "My Blogs",
        href: "/my_blogs",
        authenticated: true,
        roles: ["ROLE_USER"],
      },
      {
        label: "My Likes",
        href: "/my_likes",
        authenticated: true,
        roles: ["ROLE_USER"],
      },
    ],
  },
  {
    label: "Write a Blog",
    href: "/blog/create",
    authenticated: true,
    roles: ["ROLE_USER"],
  },
  {
    label: "Categories",
    href: "/categories",
    authenticated: true,
    roles: ["ROLE_ADMIN"],
  },
];
