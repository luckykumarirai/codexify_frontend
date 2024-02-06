export function generateRandomColorCode() {
  const colorNames = ["green", "purple", "cyan"];
  const randomColorName =
    colorNames[Math.floor(Math.random() * colorNames.length)];

  return randomColorName;
}
