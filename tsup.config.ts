import { defineConfig } from 'tsup';

// Add a basic type for the options parameter
interface BuildOptions {
  alias?: Record<string, string>;
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
  noExternal: ['crypto-browserify'],
  platform: 'node',
  target: 'es2018',
  esbuildOptions(options: BuildOptions) {
    options.alias = {
      ...options.alias,
      crypto: 'crypto-browserify'
    };
  }
}); 