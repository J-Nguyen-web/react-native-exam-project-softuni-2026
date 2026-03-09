import * as yup from "yup"

export const loginSchema = yup.object({

    email: yup
        .string()
        .trim()
        .email("Not valid email adress")
        .min(5, "Email adresses are at least 5 characters")
        .required("Required field"),

    password: yup
        .string()
        .trim()
        .min(8, "Password is at least 8 characters")
        .required("Required field"),
})