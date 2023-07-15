import * as yup from "yup"

export const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name field is required")
    .min(3, "Name field needs more than 3 characters"),
  email: yup
    .string()
    .required("Email field is required")
    .email("Email field must contain a valid email"),
  password: yup
    .string()
    .required("Password field is required")
    .min(5, "The Password field must be at least 5 characters long")
})

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email field is required")
    .email("Email field must contain a valid email"),
  password: yup
    .string()
    .required("Password field is required")
    .min(5, "The Password field must be at least 5 characters long")
})

export const newInfosValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name field is required")
    .min(3, "Name field needs more than 3 characters"),
  email: yup
    .string()
    .required("Email field is required")
    .email("Email field must contain a valid email")
})

export const PokemonIdValidationSchema = yup.object().shape({
  id: yup.number().required("Name field is required")
})
