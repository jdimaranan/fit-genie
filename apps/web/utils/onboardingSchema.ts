import { z } from "zod";

export const onboardingSchema = z.object({
  age: z
    .string()
    .min(1, "Age is required")
    .refine((v) => {
      const n = Number(v);
      return !isNaN(n) && n > 10 && n < 100;
    }, { message: "Age must be between 10 and 100" }),

  gender: z
    .union([z.literal("male"), z.literal("female"), z.literal("")])
    .refine((v) => v === "male" || v === "female", {
      message: "Gender is required",
    }),

  height: z
    .string()
    .min(1, "Height is required")
    .refine((v) => {
      const n = Number(v);
      return !isNaN(n) && n > 100 && n < 250;
    }, { message: "Enter a valid height (in cm)" }),

  weight: z
    .string()
    .min(1, "Weight is required")
    .refine((v) => {
      const n = Number(v);
      return !isNaN(n) && n > 30 && n < 250;
    }, { message: "Enter a valid weight (in kg)" }),

  goal: z
    .union([
      z.literal("BULKING"),
      z.literal("CUTTING"),
      z.literal("MAINTENANCE"),
      z.literal(undefined),
    ])
    .refine((v) => v !== undefined, { message: "Please select your goal" }),

  activityLevel: z
    .union([
      z.literal("SEDENTARY"),
      z.literal("LIGHT"),
      z.literal("MODERATE"),
      z.literal("ACTIVE"),
      z.literal("VERY_ACTIVE"),
      z.literal(undefined),
    ])
    .refine((v) => v !== undefined, { message: "Please select your activity level" }),
});

export type OnboardingFormType = z.infer<typeof onboardingSchema>;
