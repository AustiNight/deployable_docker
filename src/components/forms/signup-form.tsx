import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SignUpSection } from "@/types/content";

export type SignUpValues = Record<string, string>;

export const SignUpForm = ({ section }: { section: SignUpSection }) => {
  const defaultValues = Object.fromEntries(
    section.fields.map((field) => [field.id, ""]),
  ) as SignUpValues;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({ defaultValues });

  const [submitted, setSubmitted] = useState(false);

  const submit = handleSubmit(async (values) => {
    setSubmitted(false);
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.info("Sign up submission", values);
    setSubmitted(true);
    reset(defaultValues);
  });

  return (
    <form
      onSubmit={(event) => {
        void submit(event);
      }}
      className="space-y-5"
    >
      {section.fields.map((field) => {
        const error = errors[field.id];

        if (field.type === "select" && field.options) {
          return (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Controller
                name={field.id}
                control={control}
                rules={{
                  required: field.required ? `${field.label} is required` : false,
                }}
                render={({ field: controllerField }) => (
                  <Select
                    value={controllerField.value}
                    onValueChange={controllerField.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {error && (
                <p className="text-sm text-destructive">{String(error.message)}</p>
              )}
            </div>
          );
        }

        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type={
                field.type === "tel"
                  ? "tel"
                  : field.type === "email"
                    ? "email"
                    : "text"
              }
              placeholder={field.placeholder}
              {...register(field.id, {
                required: field.required ? `${field.label} is required` : false,
              })}
            />
            {error && (
              <p className="text-sm text-destructive">{String(error.message)}</p>
            )}
          </div>
        );
      })}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Create account"}
      </Button>
      {submitted && (
        <p className="text-sm font-medium text-emerald-600">
          {section.successMessage}
        </p>
      )}
    </form>
  );
};
