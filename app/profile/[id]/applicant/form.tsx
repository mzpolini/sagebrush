"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { Input } from "@/components/forms/Input";
import { schema, type FormData } from "./schema";
import { onSubmitAction } from "./submit";

export default function ApplicantForm() {
  const [, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  async function onSubmit(data: FormData) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      await onSubmitAction(formData);
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Experience"
        {...form.register("experience")}
        error={form.formState.errors.experience?.message}
      />
      {/* Add other fields */}
    </form>
  );
}
