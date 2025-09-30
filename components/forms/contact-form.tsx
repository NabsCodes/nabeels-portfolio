import { trackEvent } from "@/lib/services/analytics";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Send,
  MessageSquare,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/email/validations/contact";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type * as z from "zod";
import { useToast } from "@/contexts/toast-context";

// Define the type for the form data
type FormData = z.infer<typeof contactSchema>;

// Define the type for the API response
type ApiResponse = {
  status: number;
  message: string;
};

// Define the type for the API error
type ApiError = {
  error: string;
  status: number;
};

const ContactForm = () => {
  // Use the custom toast context
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  // Define the mutation for sending the email
  const mutation = useMutation<ApiResponse, AxiosError<ApiError>, FormData>({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("/api/contact-form", data);
      return response.data;
    },
    onSuccess: () => {
      // Track the event when the email is sent
      trackEvent("contact_form", "submission", "success");

      // Show a single success toast
      showToast(
        "Success!",
        "Your message has been sent successfully.",
        "success",
      );
      reset();
    },
    onError: (error) => {
      // Track the error when the email fails to send
      trackEvent(
        "contact_form",
        "submission",
        error.response?.data?.error || "unknown_error",
      );

      // Show a single error toast
      showToast(
        "Error",
        error.response?.data?.error ||
          "Something went wrong. Please try again.",
        "error",
      );
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      viewport={{ once: true }}
      className="relative md:col-span-3"
    >
      <div className="rounded-lg border border-primary-base/50 bg-background-base/80 p-6 backdrop-blur-sm dark:border-primary-base-dark/20 dark:bg-background-base-dark/80">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs text-default-base dark:text-default-base-dark">
                NAME
              </label>
              <div className="flex">
                <div className="flex items-center border border-r-0 border-primary-base/30 bg-background-base px-3 dark:border-primary-base-dark/10 dark:bg-background-base-dark">
                  <User className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
                </div>
                <Input
                  {...register("name")}
                  placeholder="Your Name"
                  className={`rounded-l-none border-primary-base/30 transition-colors dark:border-primary-base-dark/10 ${
                    errors.name
                      ? "border-red-500/50 bg-red-500/5 dark:border-red-400/50 dark:bg-red-400/5"
                      : ""
                  }`}
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <p className="text-xs font-medium">{errors.name.message}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs text-default-base dark:text-default-base-dark">
                EMAIL
              </label>
              <div className="flex">
                <div className="flex items-center border border-r-0 border-primary-base/30 bg-background-base px-3 dark:border-primary-base-dark/10 dark:bg-background-base-dark">
                  <Mail className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
                </div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Your Email"
                  className={`rounded-l-none border-primary-base/30 transition-colors dark:border-primary-base-dark/10 ${
                    errors.email
                      ? "border-red-500/50 bg-red-500/5 dark:border-red-400/50 dark:bg-red-400/5"
                      : ""
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <p className="text-xs font-medium">{errors.email.message}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-default-base dark:text-default-base-dark">
              MESSAGE
            </label>
            <div className="flex">
              <div className="flex items-start border border-r-0 border-primary-base/30 bg-background-base px-3 pt-3 dark:border-primary-base-dark/10 dark:bg-background-base-dark">
                <MessageSquare className="h-4 w-4 text-primary-base dark:text-primary-base-dark" />
              </div>
              <Textarea
                {...register("message")}
                placeholder="What's on your mind? Have an idea or project to discuss?"
                rows={6}
                className={`rounded-l-none border-primary-base/30 transition-colors dark:border-primary-base-dark/10 ${
                  errors.message
                    ? "border-red-500/50 bg-red-500/5 dark:border-red-400/50 dark:bg-red-400/5"
                    : ""
                }`}
              />
            </div>
            {errors.message && (
              <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
                <AlertCircle className="h-3.5 w-3.5" />
                <p className="text-xs font-medium">{errors.message.message}</p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full gap-2 bg-primary-base text-white hover:bg-primary-base/90 dark:bg-primary-base-dark dark:hover:bg-primary-base-dark/90"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
