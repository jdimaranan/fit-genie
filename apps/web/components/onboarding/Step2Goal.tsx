import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function Step2Goal() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        name="goal"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field}>
            <FormControlLabel
              value="BULKING"
              control={<Radio />}
              label="Bulking"
            />
            <FormControlLabel
              value="CUTTING"
              control={<Radio />}
              label="Cutting"
            />
            <FormControlLabel
              value="MAINTENANCE"
              control={<Radio />}
              label="Maintenance"
            />
          </RadioGroup>
        )}
      />

      {errors.goal && (
        <FormHelperText error>{errors.goal.message as string}</FormHelperText>
      )}
    </>
  );
}
