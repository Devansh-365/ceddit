import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
  Avatar,
  MenuDivider,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { GrAdd } from "react-icons/gr";
import { isLoggedIn, logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const user = isLoggedIn();
  const navigate = useNavigate();

  function getRandomInt() {
    return Math.floor(Math.random() * (10000 - 5)) + 4;
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?posts=${event.target.value}`);
    }
  };

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
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          align={"center"}
          justify={{ base: "center", md: "start" }}
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            fontWeight={"bold"}
            fontSize={"12pt"}
            color={useColorModeValue("blue.600", "blue.400")}
            as={"a"}
            href="/"
          >
            ceddit
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
          <Flex display={{ base: "flex" }} ml={10}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                borderRadius={"full"}
                placeholder="Search"
                onKeyPress={handleKeyPress}
              />
            </InputGroup>
          </Flex>
        </Flex>

        {user ? (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "http://graph.facebook.com/v2.5/" +
                    getRandomInt() +
                    "/picture?height=200&height=200"
                  }
                />
              </MenuButton>
              <MenuList fontSize={"10pt"}>
                {/* <MenuItem as={"a"} href={`/users/${user.userId}`}>
                  Profile
                </MenuItem> */}
                <MenuItem>Explore</MenuItem>
                <MenuDivider />
                <MenuItem
                  as={"button"}
                  onClick={() => {
                    logoutUser();
                    navigate(0);
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              fontSize={"10pt"}
              fontWeight={400}
              variant={"link"}
              href={"/login"}
            >
              Login
            </Button>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"10pt"}
              borderRadius={"full"}
              fontWeight={600}
              color={"white"}
              bg={"blue.600"}
              href={"/register"}
              _hover={{
                bg: "blue.700",
              }}
            >
              Register
            </Button>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              cursor="pointer"
              padding="0px 12px"
              borderRadius="4px"
              _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
              mr={2}
              ml={{ base: 0, md: 2 }}
              // onClick={toggleMenuOpen}
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width={{ base: "auto", lg: "200px" }}
              >
                <Flex alignItems="center">
                  <>
                    {false ? (
                      <Image
                        borderRadius="full"
                        boxSize="24px"
                        // src={directoryState.selectedMenuItem.imageURL}
                        mr={2}
                      />
                    ) : (
                      <Icon
                        fontSize={24}
                        mr={{ base: 1, md: 2 }}
                        // color={directoryState.selectedMenuItem.iconColor}
                        // as={directoryState.selectedMenuItem.icon}
                      />
                    )}
                    <Box
                      display={{ base: "none", lg: "flex" }}
                      flexDirection="column"
                      fontSize="10pt"
                    >
                      <Text fontWeight={600}>
                        Home
                        {/* {directoryState.selectedMenuItem.displayText} */}
                      </Text>
                    </Box>
                  </>
                </Flex>
                <ChevronDownIcon color="gray.500" />
              </Flex>
            </MenuButton>
            <MenuList maxHeight="300px" overflow="scroll" overflowX="hidden">
              <Box mt={3} mb={4}>
                <Text
                  pl={3}
                  mb={1}
                  fontSize="7pt"
                  fontWeight={500}
                  color="gray.500"
                >
                  MY COMMUNITIES
                </Text>
                <MenuItem
                  width="100%"
                  fontSize="10pt"
                  _hover={{ bg: "gray.100" }}
                  // onClick={() => setOpen(true)}
                >
                  <Flex alignItems="center">
                    <Icon fontSize={20} mr={2} as={GrAdd} />
                    Create Community
                  </Flex>
                </MenuItem>
                {/* {mySnippets.map((snippet) => (
                  <MenuListItem
                    key={snippet.communityId}
                    icon={FaReddit}
                    displayText={`r/${snippet.communityId}`}
                    link={`/r/${snippet.communityId}`}
                    iconColor="blue.500"
                    imageURL={snippet.imageURL}
                  />
                ))} */}
              </Box>
            </MenuList>
          </>
        )}
      </Menu>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"10pt"}
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
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
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
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Explore",
    href: "/explore",
  },
  // {
  //   label: "Hire Designers",
  //   href: "#",
  // },
];
