import { TextField, MenuItem, Stack } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function Step1UserInfo() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={3}>
      {/* Age */}
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Age"
            type="number"
            error={!!errors.age}
            helperText={errors.age?.message as string}
            fullWidth
          />
        )}
      />

      {/* Gender */}
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Gender"
            error={!!errors.gender}
            helperText={errors.gender?.message as string}
            fullWidth
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        )}
      />

      {/* Height */}
      <Controller
        name="height"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Height (cm)"
            type="number"
            error={!!errors.height}
            helperText={errors.height?.message as string}
            fullWidth
          />
        )}
      />

      {/* Weight */}
      <Controller
        name="weight"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Weight (kg)"
            type="number"
            error={!!errors.weight}
            helperText={errors.weight?.message as string}
            fullWidth
          />
        )}
      />
    </Stack>
  );
}
