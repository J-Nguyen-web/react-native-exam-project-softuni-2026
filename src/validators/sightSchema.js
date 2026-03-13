import * as yup from "yup";

export const sightSchema = yup.object({
    title: yup
        .string()
        .trim()
        .required("Every beautiful place deserves a name :)")
        .min(3, "Sight should be at least 3 characters")
        .max(20, "Maximum 20 characters, you can also use the description"),
    
    description: yup
        .string()
        .trim()
        .required("Description makes sights more beautiful :)")
        .min(10, "Description should be minimum 10 characters"),

    
    country: yup
        .string()
        .trim()
        .required("Required field")
        .max(50, "Maximum 50 characters"),

    location: yup
        .string()
        .required("Required field")
        .max(50, "Maximum 50 characters")
        .trim(),

});