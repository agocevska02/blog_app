"use client";

import { useAuth } from "@/contexts/AuthContext";
import { LoginDto } from "@/types/Users";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const navigate = useNavigate();
  const { login } = authContext;
  const handleSignIn = async (values: LoginDto) => {
    // try {
    //   console.log("Submitted values:", values);
    //   const response = await AuthService.loginUser(values);
    //   console.log(response.token);
    //   TokenService.setToken(response.token);
    // } catch (error) {
    //   console.error("Error during sign-in:", error);
    // }
   await login(values);
    navigate("/");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to write your own <Text color={"blue.400"}>blogs</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSignIn}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl
                    id="email"
                    isInvalid={!!errors.email && touched.email}
                    isRequired
                  >
                    <FormLabel>Email address</FormLabel>
                    <Field name="email" as={Input} type="email" />
                  </FormControl>
                  <FormControl
                    id="password"
                    isInvalid={!!errors.password && touched.password}
                    isRequired
                  >
                    <FormLabel>Password</FormLabel>
                    <Field name="password" as={Input} type="password" />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    ></Stack>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={() => handleSignIn}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
