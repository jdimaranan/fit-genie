"use client";

import { Container, Typography, Box } from "@mui/material";
import OnboardingStepper from "../../components/onboarding/OnboardingStepper";

export default function OnboardingPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 6 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight={600}>
          Welcome to Fit Genie
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Let’s personalize your fitness journey
        </Typography>
      </Box>

      <OnboardingStepper />
    </Container>
  );
}
