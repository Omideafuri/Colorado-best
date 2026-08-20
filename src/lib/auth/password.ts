import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';

/**
 * Hashes a password using scrypt.
 * Returns a combined string containing the salt and the derived key.
 */
export function hashPassword(password: string): string {
  // Generate a random 16-byte salt
  const salt = randomBytes(16).toString('hex');
  // Hash the password using scrypt
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  
  return `${salt}:${derivedKey}`;
}

/**
 * Verifies a password against a previously generated hash.
 */
export function verifyPassword(password: string, hash: string): boolean {
  if (!password || !hash || typeof password !== 'string' || typeof hash !== 'string') {
    return false;
  }

  const [salt, key] = hash.split(':');
  
  if (!salt || !key) {
    return false;
  }

  try {
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = scryptSync(password, salt, 64);
    
    // Use timingSafeEqual to prevent timing attacks
    return timingSafeEqual(keyBuffer, derivedKey);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}
