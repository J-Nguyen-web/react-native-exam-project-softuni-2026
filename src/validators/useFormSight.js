import { yupResolver } from "@hookform/resolvers/yup";
import { sightSchema } from "./sightSchema.js";
import { useForm } from "react-hook-form";

export function useFormSight(defaultValues = {}) {

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(sightSchema),
        defaultValues
    });

    return {
        control,
        errors,
        handleSubmit,
        isSubmitting,
        setValue,
        reset,
        watch,
    }
}