import React, { useState } from "react";
import {
  useColorMode,
  IconButton,
  Avatar,
  Flex,
  Heading,
  HStack,
  Image,
  Box,
  ButtonGroup,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  MoonIcon,
  SunIcon,
  SearchIcon,
  AddIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import AddMovieModel from "./Home/AddMovieModel";
import { useToast } from "../context/toast";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";
const NavBar = ({
  token,
  userUsername,
  setToken,
  setUserUsername,
}: {
  token: string | null;
  userUsername: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setToken: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUserUsername: any;
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showHeaderShadow, setShowHeaderShadow] = useState<boolean>(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 900px)");
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isAddMovieOpen,
    onOpen: openAddMovie,
    onClose: closeAddMovie,
  } = useDisclosure();
  const {
    isOpen: isMobileNavOpen,
    onOpen: openMobileNav,
    onClose: closeMobileNav,
  } = useDisclosure();
  const isLogged: boolean = token && userUsername ? true : false;
  window.addEventListener("scroll", () => {
    if (window.scrollY < 100) {
      setShowHeaderShadow(false);
    } else {
      !showHeaderShadow ? setShowHeaderShadow(true) : null;
    }
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | any) => {
    event.preventDefault();
    if (!searchValue) return alert("search bar should not be empty");
    alert(searchValue);
    setSearchValue("");
    isMobileNavOpen && closeMobileNav();
  };
  const logout = () => {
    setUserUsername("");
    setToken("");
    toast({
      title: "Logged out.",
      description: `You logged out from your account`,
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-left",
    });
  };
  return (
    <Box
      as="header"
      w="full"
      position="fixed"
      zIndex="10"
      bg="white"
      _dark={{ bg: "gray.800" }}
      boxShadow={showHeaderShadow ? "md" : ""}
    >
      <Flex
        as="header"
        align="center"
        maxW="90rem"
        mx="auto"
        px="2rem"
        py="1rem"
      >
        <HStack flex="1 auto" onClick={() => navigate("/")}>
          <Image src="/favicon-32x32.png" alt="welp" />
          <Heading as="h1" size="lg">
            TMovies
          </Heading>
        </HStack>
        {isSmallScreen ? (
          <IconButton
            aria-label="toggle mobile navigation"
            variant="ghost"
            style={{ aspectRatio: "1/1" }}
            onClick={openMobileNav}
          >
            <HamburgerIcon w="80%" h="80%" />
          </IconButton>
        ) : (
          <>
            <HStack as="form" flex="0 auto" onSubmit={handleSubmit}>
              <IconButton aria-label="search button" type="submit" disabled>
                <SearchIcon />
              </IconButton>
              <SearchBar
                value={searchValue}
                onChange={handleChange}
                width="25rem"
              />
              <Tooltip label="toggle color mode">
                <IconButton
                  aria-label="toggle color mode"
                  onClick={toggleColorMode}
                >
                  {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
                </IconButton>
              </Tooltip>
              {isLogged ? (
                <IconButton aria-label="add a movie" onClick={openAddMovie}>
                  <AddIcon />
                </IconButton>
              ) : null}
            </HStack>
            <Flex flex="1 auto" justify="right">
              {isLogged ? (
                <Menu>
                  <MenuButton>
                    <Avatar name={userUsername!} size="md" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <ButtonGroup isAttached>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/auth/login")}
                  >
                    Login
                  </Button>
                  <Button
                    colorScheme="linkedin"
                    onClick={() => navigate("/auth/register")}
                  >
                    Register
                  </Button>
                </ButtonGroup>
              )}
            </Flex>
          </>
        )}
      </Flex>
      {token ? (
        <AddMovieModel
          isOpen={isAddMovieOpen}
          onClose={closeAddMovie}
          token={token}
        />
      ) : null}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={closeMobileNav}
        value={searchValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
        userUsername={userUsername}
        logout={logout}
      />
    </Box>
  );
};
export default NavBar;