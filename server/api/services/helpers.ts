import crypto from "crypto";

export const generateHash = (str: string) => {
  const salt = process.env.SALT;
  const hash = crypto.createHash("sha256");
  hash.update(str);
  hash.update(salt);
  return hash.digest("hex");
}