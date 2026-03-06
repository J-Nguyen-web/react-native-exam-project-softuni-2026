import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerSchema } from "./registerSchema.js";

export function useRegisterForm(defaultValues = {}) {

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues
    });

    return {
        control,
        errors,
        handleSubmit,
        isSubmitting
    }
}