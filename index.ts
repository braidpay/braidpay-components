// Component exports
export { default as BraidPayButton } from './BraidPayButton';
export { default as PaymentForm } from './PaymentForm';

// Hook exports
export { default as usePaymentVerification } from './hooks/usePaymentVerification';

// Webhook handler exports
export {
  verifyWebhookSignature,
  processBraidPayWebhook,
} from './webhook-handler';

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

// Utils
export { cn } from './utils/cn'; 