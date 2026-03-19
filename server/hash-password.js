import crypto from "crypto";

const password = process.argv[2];

if (!password) {
  console.error("Gebruik: npm run hash:password -- \"sterk-wachtwoord\"");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(password, salt, 64).toString("hex");

console.log(`scrypt:${salt}:${hash}`);
