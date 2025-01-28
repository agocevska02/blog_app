"use client";

import { useAuth } from "@/contexts/AuthContext";
import { SigninSchema } from "@/formik/formik-validation-schemas";
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
  Text
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const navigate = useNavigate();
  const { login } = authContext;
  const handleSignIn = async (values: LoginDto) => {
    await login(values);
    navigate("/");
  };

  return (
    <Flex
      minH="100vh"
      justify="center"
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} w="100%">
        <Stack align="center" w="100%">
          <Heading
            fontSize="4xl"
            color="chakra-text-color"
          >
            Sign in to your account
          </Heading>
          <Text
            fontSize="lg"
            color="chakra-text-color"
            opacity={0.8}
          >
            to write your own blogs ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg="chakra-body-bg"
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSignIn}
            validationSchema={SigninSchema}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl
                    id="email"
                    isInvalid={!!errors.email && touched.email}
                    isRequired
                  >
                    <FormLabel color="chakra-text-color">Email address</FormLabel>
                    <Field name="email" as={Input} type="email" />
                    {errors.email && touched.email && (
                      <Text color="red.500" fontSize="sm">
                        {errors.email}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl
                    id="password"
                    isInvalid={!!errors.password && touched.password}
                    isRequired
                  >
                    <FormLabel color="chakra-text-color">Password</FormLabel>
                    <Field name="password" as={Input} type="password" />
                    {errors.password && touched.password && (
                      <Text color="red.500" fontSize="sm">
                        {errors.password}
                      </Text>
                    )}
                  </FormControl>
                  <Stack spacing={10}>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      colorScheme="teal"
                      color="white"
                      _hover={{
                        opacity: 0.8,
                      }}
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
};

export default SignIn;
