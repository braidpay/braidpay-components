/**
 * Browser polyfills for Node.js builtins
 * This file should be imported before any other imports in your entry file
 */

// Define a type for our global context
interface GlobalThisPolyfill {
  window?: typeof window;
  global?: typeof global;
  process?: any;
  Buffer?: any;
  Stream?: any;
  crypto?: any;
  [key: string]: any;
}

// Safe globalThis access for all environments
const _globalThis: GlobalThisPolyfill = (typeof globalThis !== 'undefined' ? globalThis :
                   typeof window !== 'undefined' ? window :
                   typeof global !== 'undefined' ? global :
                   typeof self !== 'undefined' ? self : {}) as any;

// Polyfill global for browser environments
if (typeof _globalThis.window !== 'undefined' && typeof _globalThis.global === 'undefined') {
  _globalThis.global = _globalThis.window;
}

// More robust process polyfill that works in all environments
// Create a minimal process object with required properties
const _process = {
  env: {},
  browser: true,
  version: '',
  nextTick: (fn: Function) => { setTimeout(fn, 0); }
};

// Apply process polyfill handling all possible environments
if (typeof _globalThis.process === 'undefined') {
  // No process exists, create it
  _globalThis.process = _process;
} else {
  // Process exists but might be missing properties
  const existingProcess = _globalThis.process;
  
  // Ensure browser property (critical for crypto-browserify)
  if (existingProcess.browser === undefined) {
    existingProcess.browser = true;
  }
  
  // Ensure version exists (critical for many Node.js modules)
  if (existingProcess.version === undefined) {
    existingProcess.version = '';
  }
  
  // Ensure nextTick is available
  if (typeof existingProcess.nextTick !== 'function') {
    existingProcess.nextTick = (fn: Function) => { setTimeout(fn, 0); };
  }
  
  // Ensure env object exists
  if (!existingProcess.env) {
    existingProcess.env = {};
  }
}

// Buffer polyfill
import { Buffer } from 'buffer';
if (typeof _globalThis.Buffer === 'undefined') {
  try {
    _globalThis.Buffer = Buffer;
  } catch (e) {
    console.warn('Failed to load Buffer module:', e);
    // Minimal Buffer implementation
    _globalThis.Buffer = {
      from: () => [],
      isBuffer: () => false,
      alloc: () => []
    };
  }
}

// Stream polyfill - ensure stream-browserify is used
import 'stream-browserify';
if (typeof _globalThis.Stream === 'undefined') {
  try {
    const Stream = require('stream-browserify');
    _globalThis.Stream = Stream;
  } catch (e) {
    console.warn('Failed to load Stream module:', e);
    // Minimal implementation to prevent crashes
    _globalThis.Stream = function() {};
  }
}

// Ensure crypto is available with needed methods
if (typeof _globalThis.crypto === 'undefined' || 
   (typeof _globalThis.window !== 'undefined' && 
    typeof _globalThis.window.crypto !== 'undefined' && 
    typeof _globalThis.crypto.createHash === 'undefined')) {
  try {
    const cryptoBrowserify = require('crypto-browserify');
    
    // In browser, extend the native crypto with crypto-browserify methods
    if (typeof _globalThis.window !== 'undefined' && 
        typeof _globalThis.window.crypto !== 'undefined') {
      Object.assign(_globalThis.crypto, cryptoBrowserify);
    } else {
      // No crypto at all, use crypto-browserify
      _globalThis.crypto = cryptoBrowserify;
    }
  } catch (e) {
    console.warn('Failed to load crypto module:', e);
  }
}

export {}; 