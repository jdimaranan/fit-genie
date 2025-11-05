import { Box, Typography, Divider } from "@mui/material";
import { calculateMacros } from "../../../../packages/utils";

export default function Step4Review({ data }: any) {
  const macros = calculateMacros(data);

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Review Your Details
      </Typography>

      <Typography>Age: {data.age}</Typography>
      <Typography>Gender: {data.gender}</Typography>
      <Typography>Height: {data.height} cm</Typography>
      <Typography>Weight: {data.weight} kg</Typography>
      <Typography>Goal: {data.goal}</Typography>
      <Typography>Activity Level: {data.activityLevel}</Typography>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Estimated Macros
        </Typography>
        <Typography>Calories: {macros.calories}</Typography>
        <Typography>Protein: {macros.protein} g</Typography>
        <Typography>Carbs: {macros.carbs} g</Typography>
        <Typography>Fat: {macros.fat} g</Typography>
      </Box>

      <Box mt={3} p={2} bgcolor="#f9f9f9" borderRadius={2}>
        <Typography variant="body2" color="text.secondary">
          <strong>Note:</strong>
          <ul style={{ marginTop: 4, marginBottom: 0, paddingLeft: 20 }}>
            <li>
              <strong>Bulking:</strong> +500 kcal calorie surplus to promote
              muscle gain.
            </li>
            <li>
              <strong>Cutting:</strong> -500 kcal calorie deficit to encourage
              fat loss.
            </li>
            <li>
              Macronutrient distribution is set to 30% Protein, 35%
              Carbohydrates, and 35% Fats.
            </li>
          </ul>
        </Typography>
      </Box>
    </Box>
  );
}
