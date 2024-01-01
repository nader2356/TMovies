import { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Divider,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../context/toast";

import { createUser } from "../../api/users";

interface ICreds {
  username: string;
  password: string;
}
const DefaultCreds = {
  username: "",
  password: "",
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Register = ({ setToken, setUserUsername }: any) => {
  const [creds, setCreds] = useState<ICreds>(DefaultCreds);
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      setToken(null);
      setUserUsername(null);
      toast({
        title: "Account Created.",
        description: `We've created your account for you.`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-left",
      });
      navigate("/auth/login");
      setCreds(DefaultCreds);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      const toastConfig = {
        title: "Something Wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-left",
      };
      if (err.response.data.error) {
        return toast({ ...toastConfig, description: err.response.data.error });
      }
      toast({ ...toastConfig, description: err.message });
    },
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = creds;
    if (!username || !password)
      return alert("username or/and password are blank");
    mutate({ username, password });
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setCreds((prev) => ({ ...prev, [name]: value }));
  };

  return (
  
    <Center
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      minH="100vh"
    >
      <form onSubmit={handleSubmit}>
        <Box px="1rem" py="1.5rem" w="23rem">
          <Stack spacing="1rem">
            <Box pb="1rem">
              <Heading as="h2" size="lg">
                Here you can Register
              </Heading>
              <Text>Let's join us</Text>
            </Box>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={creds.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={creds.password}
                onChange={handleChange}
                required
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="linkedin"
              isLoading={isLoading}
              loadingText="registering..."
            >
              REGISTER
            </Button>
            <Divider />
            <Text>
              <span style={{ opacity: "0.5" }}>Don't have an account ?</span>{" "}
              <Button colorScheme="linkedin" variant="link">
                <Link to="/auth/login">Login</Link>
              </Button>
            </Text>
          </Stack>
        </Box>
      </form>
    </Center>
  );
};
export default Register;