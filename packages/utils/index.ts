export const formatDate = (date: Date): string => date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

export const calculateMacros = (data: any) => {
  const { gender, age, height, weight, activityLevel, goal } = data;

  const proteinRatio = 0.3;
  const carbsRatio = 0.35;
  const fatsRatio = 0.35;

  const bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultiplier: Record<string, number> = {
    SEDENTARY: 1.2,
    LIGHT: 1.375,
    MODERATE: 1.55,
    ACTIVE: 1.725,
    VERY_ACTIVE: 1.9,
  };

  let calories = bmr * (activityMultiplier[activityLevel] || 1.2);

  if (goal === "BULKING") calories += 500;
  if (goal === "CUTTING") calories -= 500;

  const protein = (calories * proteinRatio) / 4; // g
  const fat = (calories * fatsRatio) / 9;
  const carbs = (calories * carbsRatio) / 4;

  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
  };
};

