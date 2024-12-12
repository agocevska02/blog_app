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
