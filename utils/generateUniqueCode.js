export function generateUniqueCode() {
  let code = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    code += characters.charAt(randomIndex);
  }

  return code;
}
