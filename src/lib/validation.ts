import { z } from "zod";
import { isCountryAllowed } from "./countries";

export const registrationSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),
  firstName: z.string().min(1, "First name is required").max(120),
  lastName: z.string().min(1, "Last name is required").max(120),
  phone: z.string().min(6, "Enter a valid phone number").max(40),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter your date of birth")
    .refine((d) => {
      const age = (Date.now() - new Date(d).getTime()) / (365.25 * 24 * 3600 * 1000);
      return age >= 18 && age < 120;
    }, "You must be at least 18 years old"),
  street: z.string().min(1, "Street is required").max(255),
  city: z.string().min(1, "City is required").max(120),
  country: z.string().refine(isCountryAllowed, "Please choose a country from the list"),
  postalCode: z.string().min(2, "Postal code is required").max(40),
  agreedToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
