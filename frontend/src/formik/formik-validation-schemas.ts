import * as Yup from "yup";

export const EmailValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required").min(3, "Too short"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
    .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter"),
});

export const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
    .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter"),
});

export const CreateBlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  categoryId: Yup.string().required("Category is required"),
  file: Yup.mixed().required("File is required"),
});
