import { defineConfig } from 'tsup';
import path from 'path';

// Add a basic type for the options parameter
interface BuildOptions {
  alias?: Record<string, string>;
  define?: Record<string, string>;
  inject?: string[];
  jsxFactory?: string;
  jsxFragment?: string;
  banner?: { js?: string };
  footer?: { js?: string };
  [key: string]: any;
}

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  clean: true,
  external: [
    'react',
    'react-dom',
    'next',
    '@radix-ui/react-dialog',
    '@radix-ui/react-label',
    '@radix-ui/react-slot',
    'class-variance-authority',
    'clsx',
    'lucide-react',
    'tailwind-merge',
    'tailwindcss-animate'
  ],
  treeshake: true,
  sourcemap: true,
  minify: true,
  splitting: false,
  keepNames: true,
  outDir: 'dist',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  noExternal: ['crypto-browserify', 'buffer', 'stream-browserify'],
  platform: 'browser',
  target: 'es2018',
  esbuildOptions(options: BuildOptions) {
    // Map Node.js built-in modules to browser-compatible alternatives
    options.alias = {
      ...options.alias,
      crypto: 'crypto-browserify',
      buffer: 'buffer',
      stream: 'stream-browserify',
    };
    
    // Inject polyfills at the top of the bundle
    options.inject = [
      ...(options.inject || []),
      path.resolve('./polyfill-inject.js'),
    ];
    
    // Add banner to ensure polyfills run first
    options.banner = {
      js: `
// BraidPay Components Polyfill Banner
// This ensures polyfills are applied before any code runs
(function() {
  // Safe globalThis access
  var _g = typeof globalThis !== 'undefined' ? globalThis :
          typeof window !== 'undefined' ? window :
          typeof global !== 'undefined' ? global :
          typeof self !== 'undefined' ? self : {};
          
  // Ensure process exists with required properties
  if (typeof _g.process === 'undefined') {
    _g.process = { browser: true, env: {}, version: '' };
  } else {
    _g.process.browser = true;
    if (!_g.process.version) _g.process.version = '';
    if (!_g.process.env) _g.process.env = {};
  }
})();
      `.trim(),
    };
    
    // Define global for browser environments
    options.define = {
      ...options.define,
      'global': 'globalThis',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    };
    
    // Don't define Buffer and process directly, let the polyfills handle it
    // This avoids conflicts between different definitions
  }
}); 