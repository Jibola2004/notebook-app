import bcrypt from 'bcrypt'; // or: const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// Hash password
export const hashPassword = async (plainPassword) => {
  const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hashed;
};

// Compare password
export const verifyPassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
