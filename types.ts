import type { ButtonProps as BaseButtonProps } from './ui/button';
import type { ReactNode } from 'react';

// BraidPayButton Types
export interface BraidPayButtonProps extends Omit<BaseButtonProps, 'onClick'> {
  paymentLink: string;
  children?: ReactNode;
  onPaymentComplete?: (data: PaymentCompleteData) => void;
  className?: string;
  dialogClassName?: string;
  buttonText?: string;
  iframeHeight?: string | number;
  initialOpen?: boolean;
}

// PaymentForm Types
export interface PaymentFormProps {
  paymentLinkID: string;
  paymentLink: string;
  productName: string;
  price: number | string;
  currency?: string;
  onPaymentComplete?: (data: PaymentCompleteData) => void;
  successMessage?: string;
  buttonText?: string;
  className?: string;
}

// Payment Verification Types
export interface PaymentVerificationOptions {
  paymentLinkID: string;
  email?: string;
  pollingInterval?: number;
  verificationEndpoint?: string;
  onPaymentComplete?: (status: PaymentStatus) => void;
}

export interface PaymentStatus {
  success: boolean;
  isPending: boolean;
  shouldShowSuccess: boolean;
  error?: string;
  data?: any;
}

export interface PaymentCompleteData {
  type: 'payment_complete';
  paymentID: string;
  status: 'success' | 'failed';
  amount?: number;
  currency?: string;
  [key: string]: unknown;
}

// Webhook Types
export interface BraidPayWebhookPayload {
  paymentLinkID: string;
  paymentID: string;
  fromAddress: string;
  toAddress: string;
  hash: string;
  network: 'ETHEREUM' | 'POLYGON' | 'BASE' | 'SOLANA';
  token: 'USDC' | 'USDT' | 'PYUSD';
  amount: number;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  Payer_Email?: string;
  [key: string]: unknown;
}

export type BraidPayWebhookHandler = (payload: BraidPayWebhookPayload) => Promise<void> | void;

export interface BraidPayWebhookProcessorOptions {
  webhookSecret: string;
  onCompleted?: BraidPayWebhookHandler;
  onPending?: BraidPayWebhookHandler;
  onError?: (error: Error) => void;
} 