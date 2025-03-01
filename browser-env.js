// Browser environment polyfills for tsup bundling
module.exports = {
  global: 'globalThis',
  // Use simpler values that ESBuild can handle
  Buffer: 'undefined', // Will be provided by polyfill instead
  process: 'undefined', // Will be provided by polyfill instead
  stream: 'undefined'  // Will be provided by polyfill instead
}; 