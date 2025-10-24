import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContactSection } from "@/types/content";

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export const ContactForm = ({ section }: { section: ContactSection }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: { name: "", email: "", message: "" },
  });
  const [submitted, setSubmitted] = useState(false);

  const submit = handleSubmit(async (values) => {
    setSubmitted(false);
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.info("Contact form submission", values);
    setSubmitted(true);
    reset();
  });

  return (
    <form
      onSubmit={(event) => {
        void submit(event);
      }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Jane Doe"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /.+@.+\..+/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          placeholder="Project scope, goals, and timeline..."
          {...register("message", {
            required: "Please share a quick summary",
            minLength: { value: 10, message: "Tell us a bit more (10+ characters)" },
          })}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
      {submitted && (
        <p className="text-sm font-medium text-emerald-600">{section.successMessage}</p>
      )}
    </form>
  );
};

