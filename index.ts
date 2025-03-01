// Import polyfills first
import './polyfill';

// =============================
// CLIENT-SIDE (UI) COMPONENTS
// =============================
// These components are safe to use in browser/client environments

// Component exports
export { default as BraidPayButton } from './BraidPayButton';
export { default as PaymentForm } from './PaymentForm';

// Hook exports
export { default as usePaymentVerification } from './hooks/usePaymentVerification';

// UI Components
export { Button, type ButtonProps } from './ui/button';
export { 
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
export { Input, type InputProps } from './ui/input';
export { Label } from './ui/label';
export { 
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';

// General utilities
export { cn } from './utils/cn';

// =============================
// SERVER-SIDE FUNCTIONS
// =============================
// These functions are intended for server-side use
// (Next.js API routes, server components, Node.js environments)

// Webhook handler exports - use these in your API routes
export {
  verifyWebhookSignature,
  processBraidPayWebhook,
} from './utils/webhook';

// =============================
// SHARED TYPES
// =============================
// Types are safe to use in both client and server code

// Type exports
export type {
  BraidPayButtonProps,
  PaymentFormProps,
  PaymentVerificationOptions,
  PaymentStatus,
  PaymentCompleteData,
  BraidPayWebhookPayload,
  BraidPayWebhookHandler,
  BraidPayWebhookProcessorOptions,
} from './types';

// Re-export the webhook API template directly
// Users should copy this file to their own project rather than importing it
// export * from './webhook-api-template'; 