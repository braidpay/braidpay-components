declare module 'crypto-browserify' {
  import { Buffer } from 'buffer';
  
  export interface Hash {
    update(data: string | Buffer, inputEncoding?: string): Hash;
    digest(encoding?: string): Buffer | string;
  }

  export interface Hmac {
    update(data: string | Buffer, inputEncoding?: string): Hmac;
    digest(encoding?: string): Buffer | string;
  }

  export function createHash(algorithm: string): Hash;
  export function createHmac(algorithm: string, key: string | Buffer): Hmac;
  
  // Add other crypto functions as needed
  const crypto: {
    createHash: typeof createHash;
    createHmac: typeof createHmac;
  };
  
  export default crypto;
} 