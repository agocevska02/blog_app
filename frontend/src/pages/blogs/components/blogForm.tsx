import { useState } from "react";
import { CreateBlogSchema } from "@/formik/formik-validation-schemas";
import { BlogDto } from "@/types/Blogs";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Formik, Form } from "formik";
import { useDropzone } from "react-dropzone";

interface BlogFormProps {
  initialValues: {
    id?: string;
    title: string;
    content: string;
    categoryId: string;
    file: File | string;
  };
  categories: { id: string; name: string }[];
  onSubmit: (initialValues: BlogDto, values: BlogDto) => Promise<void>;
  heading: string;
  submitButtonLabel: string;
}

const BlogForm = ({
  initialValues,
  categories,
  onSubmit,
  heading,
  submitButtonLabel,
}: BlogFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="start"
      p={4}
    >
      <Box width="100%" maxW="1000px" p={8}>
        <Heading
          as="h1"
          size="xl"
          mb={8}
          textAlign="center"
          color="chakra-text-color"
        >
          {heading}
        </Heading>

        <Formik
          initialValues={initialValues}
          validationSchema={CreateBlogSchema}
          onSubmit={async (values, actions) => {
            setIsLoading(true);
            await onSubmit(initialValues, values);
            setIsLoading(false);
            actions.setSubmitting(false);
          }}
          key={JSON.stringify(initialValues)}
        >
          {({ handleSubmit, errors, touched, setFieldValue, values }) => {
            const onDrop = (acceptedFiles: File[]) => {
              if (acceptedFiles.length > 0) {
                setFieldValue("file", acceptedFiles[0]);
              }
            };

            const { getRootProps, getInputProps, isDragActive } = useDropzone({
              accept: {
                "image/jpeg": [".jpeg", ".jpg"],
                "image/png": [".png"],
                "image/svg+xml": [".svg"],
              },
              onDrop,
            });

            const inputStyles = {
              border: "none",
              focusBorderColor: "transparent",
              boxShadow: "none",
              bg: "transparent",
              fontSize: "1.2rem",
              color: "chakra-text-color",
              _placeholder: { color: "gray.400", opacity: 0.6 },
              paddingX: "10px",
            };

            return (
              <Form onSubmit={handleSubmit}>
                <FormControl
                  isInvalid={!!errors.title && touched.title}
                  id="title"
                  mb={6}
                  isRequired
                >
                  <Field
                    name="title"
                    as={Input}
                    placeholder="Blog Title"
                    fontWeight={700}
                    {...inputStyles}
                  />
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.content && touched.content}
                  id="content"
                  mb={6}
                  isRequired
                >
                  <Field
                    name="content"
                    as={Textarea}
                    placeholder="Write your content here..."
                    resize="vertical"
                    minHeight="450px"
                    {...inputStyles}
                  />
                  <FormErrorMessage>{errors.content}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.categoryId && touched.categoryId}
                  id="categoryId"
                  mb={6}
                  isRequired
                >
                  <FormLabel
                    fontSize="1.2rem"
                    fontWeight="bold"
                    color="teal.400"
                    mb={2}
                  >
                    Category
                  </FormLabel>
                  <Field
                    name="categoryId"
                    as="select"
                    style={{
                      appearance: "none",
                      border: "none",
                      fontSize: "1.2rem",
                      padding: "8px 0",
                      background: "var(--chakra-colors-chakra-body-bg)",
                      color: "var(--chakra-colors-chakra-text-color)",
                      borderBottom:
                        "1px solid var(--chakra-colors-chakra-border-color)",
                      width: "100%",
                    }}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.file && touched.file}
                  id="file"
                  mb={6}
                  isRequired
                >
                  <Box
                    {...getRootProps()}
                    p={6}
                    border="2px dashed"
                    borderColor={isDragActive ? "teal.400" : "gray.300"}
                    textAlign="center"
                    cursor="pointer"
                  >
                    <input {...getInputProps()} />
                    {values.file ? (
                      <img
                        src={
                          typeof values.file === "string"
                            ? values.file
                            : URL.createObjectURL(values.file)
                        }
                        alt="Blog"
                        style={{
                          maxHeight: "200px",
                          objectFit: "cover",
                          margin: "0 auto",
                        }}
                      />
                    ) : (
                      <p>Drag and drop an image, or click to select one</p>
                    )}
                  </Box>
                  <FormErrorMessage>{errors.file}</FormErrorMessage>
                </FormControl>

                <Box
                  position="fixed"
                  bottom="20px"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="chakra-body-bg"
                  py={3}
                  px={6}
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={4}
                  zIndex="1000"
                  width="50%"
                >
                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    width="90%"
                    isLoading={isLoading}
                    loadingText="Submitting..."
                    isDisabled={isLoading}
                  >
                    {submitButtonLabel}
                  </Button>
                  <Button
                    type="button"
                    width="90%"
                    onClick={() => window.history.back()}
                    colorScheme="gray"
                    size="lg"
                    isDisabled={isLoading}
                  >
                    Cancel
                  </Button>
                </Box>

                <Box height="60px" />
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default BlogForm;
