import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Field, Form } from "formik";
import { RegistrationDto } from "@/types/Users";
import { AuthService } from "@/api/services/AuthenticationService";
import { SignupSchema } from "@/formik/formik-validation-schemas";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = async (values: RegistrationDto) => {
    try {
      const user = await AuthService.signupUser(values);
      if (user) {
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while fetching blogs.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH="100vh"
      justify="center"
    >
      <Stack spacing={8} mx="auto" maxW="lg" width="100%" py={12} px={6}>
        <Stack align="center">
          <Heading
            fontSize="4xl"
            textAlign="center"
            color="chakra-text-color"
          >
            Sign up
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
              fullName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Stack spacing={4}>
                  <HStack>
                    <Box w={"100%"}>
                      <FormControl
                        id="fullName"
                        isInvalid={!!errors.fullName && touched.fullName}
                        isRequired
                      >
                        <FormLabel color="chakra-text-color">Full Name</FormLabel>
                        <Field
                          name="fullName"
                          as={Input}
                          type="text"
                          width="100%"
                        />
                        {errors.fullName && touched.fullName && (
                          <Text color="red.500" fontSize="sm">
                            {errors.fullName}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                  </HStack>
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
                    <InputGroup>
                      <Field
                        name="password"
                        as={Input}
                        type={showPassword ? "text" : "password"}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPass) => !showPass)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && touched.password && (
                      <Text color="red.500" fontSize="sm">
                        {errors.password}
                      </Text>
                    )}
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      size="lg"
                      colorScheme="teal"
                      color="white"
                      _hover={{
                        opacity: 0.8,
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align="center" color="chakra-text-color">
                      Already a user? <Link color="teal.400">Login</Link>
                    </Text>
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

export default Signup;
