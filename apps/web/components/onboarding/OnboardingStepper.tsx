"use client";

import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  onboardingSchema,
  OnboardingFormType,
} from "../../utils/onboardingSchema";

import Step1UserInfo from "./Step1UserInfo";
import Step2Goal from "./Step2Goal";
import Step3Activity from "./Step3Activity";
import Step4Review from "./Step4Review";

const steps = ["Basic Info", "Fitness Goal", "Activity Level", "Review"];

export default function OnboardingStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm<OnboardingFormType>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
    defaultValues: {
      age: "",
      gender: undefined,
      height: "",
      weight: "",
      goal: undefined,
      activityLevel: undefined,
    },
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    formState: { isValid },
  } = methods;

  const handleNext = async () => {
    let fieldsToValidate: (keyof OnboardingFormType)[] = [];

    if (activeStep === 0)
      fieldsToValidate = ["age", "gender", "height", "weight"];
    if (activeStep === 1) fieldsToValidate = ["goal"];
    if (activeStep === 2) fieldsToValidate = ["activityLevel"];

    const valid = await trigger(fieldsToValidate);

    if (valid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (data: OnboardingFormType) => {
    console.log("✅ Final Onboarding Data:", data);
    // TODO: Save data to DB and redirect to /dashboard
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Step1UserInfo />;
      case 1:
        return <Step2Goal />;
      case 2:
        return <Step3Activity />;
      case 3:
        return <Step4Review data={getValues()} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box mt={4}>{getStepContent(activeStep)}</Box>

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" type="submit">
                Finish
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </form>
    </FormProvider>
  );
}
