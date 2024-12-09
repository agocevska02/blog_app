import { SubscriptionService } from "@/api/services/SubscriptionService";
import { EmailValidationSchema } from "@/formik/formil-validation-schemas";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";

const SubscriptionForm = () => {
  const toast = useToast();
  const onSubmit = async (values: { email: string }) => {
    try {
      await SubscriptionService.addSubscription({ email: values.email });
      toast({
        title: "Subscription Successful",
        description: "You have been successfully subscribed to our newsletter.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Subscription Failed",
        description:
          "An error occurred while subscribing. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt="10" mb="10">
      <Formik
        validationSchema={EmailValidationSchema}
        initialValues={{ email: "" }}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <Flex justifyContent="space-between">
              <FormControl>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("email", e.target.value);
                  }}
                />
                <FormErrorMessage>
                  <ErrorMessage name="email" />
                </FormErrorMessage>
              </FormControl>

              <Button ml="2" px="6" colorScheme="teal" type="submit">
                Subscribe
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SubscriptionForm;
