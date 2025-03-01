import { defineConfig } from 'tsup';
import path from 'path';

// Add a basic type for the options parameter
interface BuildOptions {
  alias?: Record<string, string>;
  define?: Record<string, string>;
  inject?: string[];
  jsxFactory?: string;
  jsxFragment?: string;
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
      buffer: 'buffer/',
      stream: 'stream-browserify',
    };
    
    // Inject polyfills at the top of the bundle
    options.inject = [
      ...(options.inject || []),
      path.resolve('./polyfill-inject.js'),
    ];
    
    // Define global to window for browser environments
    options.define = {
      ...options.define,
      'global': 'globalThis',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    };
    
    // Don't try to load browser-env.js directly as it contains incompatible values
    // Instead, manually set the required values in the correct format
    options.define['Buffer'] = 'undefined';  // Will be provided by the polyfill
    options.define['process'] = 'undefined'; // Will be provided by the polyfill
  }
}); 