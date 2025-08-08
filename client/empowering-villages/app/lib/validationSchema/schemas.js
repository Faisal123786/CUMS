import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Name must contain only letters and valid characters"
    )
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[^<>]+$/, "Email must not contain HTML tags or angle brackets")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .matches(/^[^<>]+$/, "Password must not contain HTML tags")
    .required("Password is required"),

  confirm_Password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[^<>]+$/, "Email must not contain HTML tags or angle brackets")
    .required("Email is required"),
  password: Yup.string()
    .matches(/^[^<>]+$/, "Password must not contain HTML tags")
    .required("Password is required"),
});

export const villageSchema = Yup.object({
  name: Yup.string()
    .required("Village Name is required")
    .matches(
      /^[a-zA-Z0-9\s'-]+$/,
      "Name must contain only letters, numbers, spaces, apostrophes, or hyphens"
    ),
  location: Yup.string()
    .required("Location is required")
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Location must contain only letters and valid characters"
    ),
  nearerCity: Yup.string()
    .required("Nearer City is required")
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Nearer City must contain only letters and valid characters"
    ),
  district: Yup.string()
    .required("District is required")
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "District must contain only letters and valid characters"
    ),
  tehsil: Yup.string()
    .required("Tehsil is required")
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Tehsil must contain only letters and valid characters"
    ),
  postalCode: Yup.number()
    .typeError("Postal Code must be a number")
    .required("Postal Code is required"),
});

export const employeeSchema = Yup.object({
  name: Yup.string()
    .required("Employee Name is required")
    .matches(
      /^[a-zA-Z0-9\s'-]+$/,
      "Name must contain only letters, numbers, spaces, apostrophes, or hyphens"
    ),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[^<>]+$/, "Email must not contain HTML tags or angle brackets")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  role: Yup.string()
    .required("Role is required")
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Role must contain only letters and valid characters"
    ),
  area: Yup.string()
    .required("Area is required")
});
