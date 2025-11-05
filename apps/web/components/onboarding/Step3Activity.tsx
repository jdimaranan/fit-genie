import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function Step3Activity() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        name="activityLevel"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field}>
            <FormControlLabel
              value="SEDENTARY"
              control={<Radio />}
              label="Sedentary"
            />
            <FormControlLabel
              value="LIGHT"
              control={<Radio />}
              label="Light exercise (1–3 days/week)"
            />
            <FormControlLabel
              value="MODERATE"
              control={<Radio />}
              label="Moderate (3–5 days/week)"
            />
            <FormControlLabel
              value="ACTIVE"
              control={<Radio />}
              label="Active (6–7 days/week)"
            />
            <FormControlLabel
              value="VERY_ACTIVE"
              control={<Radio />}
              label="Very Active (physical job or 2x/day)"
            />
          </RadioGroup>
        )}
      />

      {errors.activityLevel && (
        <FormHelperText error>
          {errors.activityLevel.message as string}
        </FormHelperText>
      )}
    </>
  );
}
