// Browser environment polyfills for tsup bundling
module.exports = {
  global: 'globalThis',
  // Define process with required properties
  process: {
    browser: true,
    env: {},
    version: '',
    nextTick: function(fn) { setTimeout(fn, 0); }
  },
  // These will be provided by polyfills
  Buffer: 'undefined',
  stream: 'undefined',
  // Ensure crypto is available
  crypto: 'undefined'
}; 