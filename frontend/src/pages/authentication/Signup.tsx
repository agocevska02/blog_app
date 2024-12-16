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
  useColorModeValue,
  Link,
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

  const handleSignup = async (values: RegistrationDto) => {
    try {
      const user = await AuthService.signupUser(values);
      if (user) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during sign-up:", err);
    }
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
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to write your own blogs ✌️
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
                    <Box>
                      <FormControl
                        id="fullName"
                        isInvalid={!!errors.fullName && touched.fullName}
                        isRequired
                      >
                        <FormLabel>Full Name</FormLabel>
                        <Field name="fullName" as={Input} type="text" />
                        <Text color="red.500" fontSize="sm">
                          {errors.fullName && touched.fullName}
                        </Text>
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl
                    id="email"
                    isInvalid={!!errors.email && touched.email}
                    isRequired
                  >
                    <FormLabel>Email address</FormLabel>
                    <Field name="email" as={Input} type="email" />
                    <Text color="red.500" fontSize="sm">
                      {errors.email && touched.email && errors.email}
                    </Text>
                  </FormControl>
                  <FormControl
                    id="password"
                    isInvalid={!!errors.password && touched.password}
                    isRequired
                  >
                    <FormLabel>Password</FormLabel>
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
                    <Text color="red.500" fontSize="sm">
                      {errors.password && touched.password && errors.password}
                    </Text>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user? <Link color={"blue.400"}>Login</Link>
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
