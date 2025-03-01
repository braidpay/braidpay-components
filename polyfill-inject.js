// This file is injected at the top of the bundle
// It provides polyfills for browser environments

// Polyfill global
if (typeof window !== 'undefined' && typeof global === 'undefined') {
  window.global = window;
}

// Polyfill process
if (typeof window !== 'undefined' && typeof process === 'undefined') {
  window.process = { browser: true, env: {} };
}

// Ensure Buffer is available
if (typeof window !== 'undefined' && typeof Buffer === 'undefined') {
  try {
    // The buffer module will be bundled by esbuild
    const BufferModule = require('buffer/');
    window.Buffer = BufferModule.Buffer;
  } catch (e) {
    console.warn('Failed to polyfill Buffer:', e);
  }
}

// Ensure Stream is available
if (typeof window !== 'undefined' && typeof window.Stream === 'undefined') {
  try {
    // The stream-browserify module will be bundled by esbuild
    const Stream = require('stream-browserify');
    window.Stream = Stream;
  } catch (e) {
    console.warn('Failed to polyfill Stream:', e);
  }
} 