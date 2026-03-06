import * as yup from "yup";

export const sightSchema = yup.object({
    title: yup
        .string()
        .trim()
        .required("Every beautiful place deserves a name :)")
        .min(3, "Minimum 3 characters")
        .max(20, "Maximum 20 characters, you can also use the description"),
    
    description: yup
        .string()
        .trim()
        .required("Description makes sights more beautiful :)")
        .min(10, "Minimum 10 characters"),

    
    country: yup
        .string()
        .trim()
        .required("Required field")
        .max(50, "Maximum 50 characters"),

    city: yup
        .string()
        .required("Required field")
        .max(50, "Maximum 50 characters")
        .trim(),

});