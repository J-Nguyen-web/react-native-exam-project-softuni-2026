import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "./loginSchema.js";

export function useLoginForm(defaultValues = {}) {

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues
    });

    return {
        control,
        errors,
        handleSubmit,
        isSubmitting
    }
}