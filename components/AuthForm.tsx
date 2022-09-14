import React, { FC, useState } from "react";
import { Box, Flex, Input, Button, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { useSWRConfig } from "swr";
import NextImage from "next/image";
import NextLink from "next/link";
import { auth } from "../lib/mutations";

type AuthFormProps = {
  mode: "signin" | "signup";
};

const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  const router = useRouter();

  const onSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      auth(mode, { email, password }).then((data) => {
        setIsLoading(false);
        router.push("/");
        toast({
          title: "Welcome back",
          description: `Welcome back ${data?.firstName}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      auth(mode, { email, password, firstName, lastName })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex
        direction="column"
        justify="center"
        align="center"
        height="calc(100vh - 100px)"
      >
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          {mode === "signin" ? (
            <form onSubmit={onSignin}>
              <Flex direction="column" justify="space-between" height="150px">
                <Input
                  width="300px"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Input
                  width="300px"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <Button
                  type="submit"
                  sx={{ "&:hover": { bg: "green.300" } }}
                  bg="green.500"
                  isLoading={isLoading}
                >
                  Signin
                </Button>
              </Flex>
              <Text>Dont have an account? Signup here</Text>
            </form>
          ) : (
            <form onSubmit={onSignup}>
              <Flex direction="column" justify="space-between" height="350px">
                <Input
                  width="300px"
                  placeholder="First Name"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <Input
                  width="300px"
                  placeholder="Last Name"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <Input
                  width="300px"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Input
                  width="300px"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <Button
                  type="submit"
                  bg="green.500"
                  isLoading={isLoading}
                  sx={{ "&:hover": { bg: "green.300" } }}
                >
                  Signup
                </Button>
                <Text>
                  Already have an account? Signin{" "}
                  <NextLink href="/signup" passHref>
                    here
                  </NextLink>
                </Text>
              </Flex>
            </form>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
