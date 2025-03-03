// This file is injected at the top of the bundle
// It provides polyfills for browser environments

// Safe globalThis access
const _globalThis = typeof globalThis !== 'undefined' ? globalThis :
                   typeof window !== 'undefined' ? window :
                   typeof global !== 'undefined' ? global :
                   typeof self !== 'undefined' ? self : {};

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
  nextTick: function(fn) { setTimeout(fn, 0); }
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
    existingProcess.nextTick = function(fn) { setTimeout(fn, 0); };
  }
  
  // Ensure env object exists
  if (!existingProcess.env) {
    existingProcess.env = {};
  }
}

// Ensure Buffer is available
if (typeof _globalThis.Buffer === 'undefined') {
  try {
    // Import buffer directly instead of using buffer/
    const BufferModule = require('buffer');
    _globalThis.Buffer = BufferModule.Buffer;
  } catch (e) {
    // Fallback Buffer implementation if module can't be loaded
    console.warn('Failed to load Buffer module:', e);
    
    // Provide minimal Buffer implementation to prevent crashes
    _globalThis.Buffer = {
      from: function() { return []; },
      isBuffer: function() { return false; },
      alloc: function() { return []; }
    };
  }
}

// Ensure Stream is available
if (typeof _globalThis.Stream === 'undefined') {
  try {
    // Stream-browserify should be bundled by esbuild
    const Stream = require('stream-browserify');
    _globalThis.Stream = Stream;
  } catch (e) {
    console.warn('Failed to load Stream module:', e);
    // Minimal implementation to prevent crashes
    _globalThis.Stream = function() {};
  }
}

// Ensure crypto is available
if (typeof _globalThis.crypto === 'undefined' || 
   (typeof _globalThis.window !== 'undefined' && typeof _globalThis.window.crypto !== 'undefined' && typeof _globalThis.crypto.createHash === 'undefined')) {
  try {
    const cryptoBrowserify = require('crypto-browserify');
    
    // In browser, extend the native crypto with crypto-browserify methods
    if (typeof _globalThis.window !== 'undefined' && typeof _globalThis.window.crypto !== 'undefined') {
      Object.assign(_globalThis.crypto, cryptoBrowserify);
    } else {
      // No crypto at all, use crypto-browserify
      _globalThis.crypto = cryptoBrowserify;
    }
  } catch (e) {
    console.warn('Failed to load crypto module:', e);
    // Provide minimal implementation to prevent crashes
    if (typeof _globalThis.crypto === 'undefined') {
      _globalThis.crypto = {
        createHash: function() { 
          return { 
            update: function() { return this; },
            digest: function() { return ''; }
          };
        }
      };
    }
  }
} 