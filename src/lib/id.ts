import { customAlphabet } from "nanoid";

// URL-safe, collision-resistant, DB-friendly ids.
const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nano = customAlphabet(alphabet, 24);

export function createId(): string {
  return nano();
}

const tokenAlphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoToken = customAlphabet(tokenAlphabet, 48);

export function createToken(): string {
  return nanoToken();
}
