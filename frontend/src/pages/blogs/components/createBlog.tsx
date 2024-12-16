import { BlogService } from "@/api/services/BlogService";
import { CreateBlogSchema } from "@/formik/formik-validation-schemas";
import useFetchCategories from "@/hooks/useFetchCategories";
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
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const { categories } = useFetchCategories();
  const navigate = useNavigate();

  return (
    <Box>
      <Heading>Create Blog</Heading>

      <Formik
        initialValues={{
          title: "",
          content: "",
          categoryId: "",
          file: null,
        }}
        validationSchema={CreateBlogSchema}
        onSubmit={async (values) => {
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("content", values.content);
          formData.append("categoryId", values.categoryId);
          if (values.file) {
            formData.append("file", values.file as Blob);
          }

          const data = await BlogService.addBlog(formData);
          if (data) {
            navigate("/my_blogs");
          }
        }}
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

          return (
            <Form onSubmit={handleSubmit}>
              <FormControl
                isInvalid={!!errors.title && touched.title}
                id="title"
                isRequired
              >
                <FormLabel>Title</FormLabel>
                <Field name="title" as={Input} type="text" />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.content && touched.content}
                id="content"
                isRequired
              >
                <FormLabel>Content</FormLabel>
                <Field name="content" as={Textarea} />
                <FormErrorMessage>{errors.content}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.categoryId && touched.categoryId}
                id="categoryId"
                isRequired
              >
                <FormLabel>Category</FormLabel>
                <Field name="categoryId" as="select">
                  <option value="">Select a category</option>
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
                isRequired
              >
                <FormLabel>Image</FormLabel>
                <Box
                  {...getRootProps()}
                  p={4}
                  border="2px dashed"
                  borderColor={isDragActive ? "teal.400" : "gray.300"}
                  textAlign="center"
                  cursor="pointer"
                  borderRadius="md"
                >
                  <input {...getInputProps()} />
                  {values.file && (
                    <img
                      src={
                        (values.file as File) instanceof File
                          ? URL.createObjectURL(values.file)
                          : ""
                      }
                      alt="Blog"
                      style={{}}
                    />
                  )}
                  {!values.file && (
                    <p>Drag and drop an image, or click to select one</p>
                  )}
                </Box>
                {touched.file && errors.file && (
                  <FormErrorMessage>{errors.file}</FormErrorMessage>
                )}
              </FormControl>

              <Button type="submit" mt={4}>
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateBlog;
