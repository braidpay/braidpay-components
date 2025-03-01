/**
 * Browser polyfills for Node.js builtins
 * This file should be imported before any other imports in your entry file
 */

// Handle global
if (typeof window !== 'undefined' && typeof global === 'undefined') {
  (window as any).global = window;
}

// Buffer polyfill
import { Buffer } from 'buffer/';
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}

// Stream polyfill - ensure stream-browserify is used
import 'stream-browserify';
if (typeof window !== 'undefined' && !(window as any).Stream) {
  try {
    const Stream = require('stream-browserify');
    (window as any).Stream = Stream;
  } catch (e) {
    console.warn('Failed to polyfill Stream:', e);
  }
}

// Process polyfill for crypto-browserify
if (typeof window !== 'undefined' && typeof process === 'undefined') {
  (window as any).process = { browser: true, env: {} };
}

export {}; 