import { CloseIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  IconButton,
  Button,
  Stack,
  Center,
  ButtonGroup,
  Avatar,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const MobileNav = ({
  isOpen,
  onClose,
  value,
  onChange,
  onSubmit,
  userUsername,
  logout,
}: any) => {
  const navigate = useNavigate();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader display="flex">
          {userUsername ? <Avatar name={userUsername!} size="md" /> : null}
          <IconButton
            aria-label="close navigation bar"
            variant="ghost"
            ml="auto"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <DrawerBody>
          <Stack h="full" justify="space-between">
            <form onSubmit={onSubmit}>
              <Center>
                <SearchBar value={value} onChange={onChange} isAttached />
                <Button
                  type="submit"
                  style={{
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                  }}
                  disabled
                >
                  Search
                </Button>
              </Center>
            </form>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          {userUsername ? (
            <Button
              onClick={() => {
                onClose();
                logout();
              }}
            >
              Logout
            </Button>
          ) : (
            <ButtonGroup isAttached size="lg" onClick={onClose}>
              <Button variant="outline" onClick={() => navigate("/auth/login")}>
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;