import { yupResolver } from "@hookform/resolvers/yup";
import { sightSchema } from "./sightSchema.js";
import { useForm } from "react-hook-form";

export function useFormSight(defaultValues = {}) {

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(sightSchema),
        defaultValues
    });

    return {
        control,
        errors,
        handleSubmit,
        isSubmitting
    }
}