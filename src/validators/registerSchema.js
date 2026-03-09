import * as yup from "yup"

export const registerSchema = yup.object({

    username: yup
        .string()
        .trim()
        .min(2, "Username should be at least 2 characters")
        .required("Username will be displayed for your creations"),

    email: yup
        .string()
        .trim()
        .email("Not valid email adress")
        .min(5, "Email adresses are at least 5 characters")
        .required("Required field"),

    password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .required("Required field"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null] , "Passwords must match")
        .required("Repeat your password")
    
})