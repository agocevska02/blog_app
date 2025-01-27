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
  onSubmit: (initialValues: BlogDto, values: BlogDto) => void;
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
  const formKey = JSON.stringify(initialValues);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="start"
      bg="white"
      p={4}
    >
      <Box width="100%" maxW="1000px" p={8}>
        <Heading as="h1" size="xl" mb={8} textAlign="center">
          {heading}
        </Heading>

        <Formik
          initialValues={initialValues}
          validationSchema={CreateBlogSchema}
          onSubmit={(values) => onSubmit(initialValues, values)}
          key={formKey}
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
              _placeholder: { color: "gray.400" },
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
                    value={values.title}
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
                    value={values.content}
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
                    htmlFor="categoryId"
                    fontSize="1.2rem"
                    fontWeight="bold"
                    color="teal.600"
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
                      background: "transparent",
                      borderBottom: "1px solid gray",
                      width: "100%",
                    }}
                    value={values.categoryId}
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
                  {touched.file && errors.file && (
                    <FormErrorMessage>Image is required</FormErrorMessage>
                  )}
                </FormControl>

                <Box
                  position="sticky"
                  bottom="0"
                  bg="white"
                  py={4}
                  borderTop="1px solid #ddd"
                  textAlign="center"
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    width="90%"
                    marginRight={"10px"}
                  >
                    {submitButtonLabel}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => window.history.back()}
                    colorScheme="teal"
                    size="lg"
                    width="90%"
                  >
                    Cancel
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default BlogForm;
