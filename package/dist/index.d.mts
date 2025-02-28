import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as LabelPrimitive from '@radix-ui/react-label';
import { ClassValue } from 'clsx';

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface BraidPayButtonProps$1 extends Omit<ButtonProps, 'onClick'> {
    paymentLink: string;
    children?: ReactNode;
    onPaymentComplete?: (data: any) => void;
    className?: string;
    dialogClassName?: string;
    buttonText?: string;
    iframeHeight?: string | number;
    initialOpen?: boolean;
}
/**
 * BraidPayButton - A reusable button component that opens a dialog with a BraidPay payment iframe
 *
 * @param paymentLink - The BraidPay payment link URL
 * @param buttonText - Text to display on the button (default: "Pay with USDC")
 * @param children - Optional custom content for the button
 * @param onPaymentComplete - Optional callback function when payment is completed
 * @param className - Optional CSS class for the button
 * @param dialogClassName - Optional CSS class for the dialog
 * @param iframeHeight - Optional height for the iframe (default: "580px")
 * @param initialOpen - Whether the payment dialog should be open initially
 */
declare function BraidPayButton({ paymentLink, buttonText, children, onPaymentComplete, className, dialogClassName, iframeHeight, initialOpen, ...buttonProps }: BraidPayButtonProps$1): react_jsx_runtime.JSX.Element;

interface PaymentFormProps$1 {
    paymentLinkID: string;
    paymentLink: string;
    productName: string;
    price: number | string;
    currency?: string;
    onPaymentComplete?: (data: any) => void;
    successMessage?: string;
    buttonText?: string;
    className?: string;
}
/**
 * PaymentForm - A comprehensive payment form that collects email and integrates with BraidPay
 *
 * @param paymentLinkID - The BraidPay payment link ID for webhook verification
 * @param paymentLink - The BraidPay payment link URL
 * @param productName - Name of the product being purchased
 * @param price - Price of the product
 * @param currency - Currency symbol (default: "$")
 * @param onPaymentComplete - Callback when payment is completed
 * @param successMessage - Message to show on successful payment
 * @param buttonText - Text to display on the payment button
 * @param className - Optional CSS class for the form container
 */
declare function PaymentForm({ paymentLinkID, paymentLink, productName, price, currency, onPaymentComplete, successMessage, buttonText, className, }: PaymentFormProps$1): react_jsx_runtime.JSX.Element;

interface BraidPayButtonProps extends Omit<ButtonProps, 'onClick'> {
    paymentLink: string;
    children?: ReactNode;
    onPaymentComplete?: (data: PaymentCompleteData) => void;
    className?: string;
    dialogClassName?: string;
    buttonText?: string;
    iframeHeight?: string | number;
    initialOpen?: boolean;
}
interface PaymentFormProps {
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
interface PaymentVerificationOptions {
    paymentLinkID: string;
    email?: string;
    pollingInterval?: number;
    verificationEndpoint?: string;
    onPaymentComplete?: (status: PaymentStatus) => void;
}
interface PaymentStatus {
    success: boolean;
    isPending: boolean;
    shouldShowSuccess: boolean;
    error?: string;
    data?: any;
}
interface PaymentCompleteData {
    type: 'payment_complete';
    paymentID: string;
    status: 'success' | 'failed';
    amount?: number;
    currency?: string;
    [key: string]: unknown;
}
interface BraidPayWebhookPayload$1 {
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
type BraidPayWebhookHandler$1 = (payload: BraidPayWebhookPayload$1) => Promise<void> | void;
interface BraidPayWebhookProcessorOptions$1 {
    webhookSecret: string;
    onCompleted?: BraidPayWebhookHandler$1;
    onPending?: BraidPayWebhookHandler$1;
    onError?: (error: Error) => void;
}

declare function usePaymentVerification({ paymentLinkID, email: initialEmail, pollingInterval, verificationEndpoint, onPaymentComplete, }: PaymentVerificationOptions): {
    status: PaymentStatus;
    registerPayment: (newEmail: string) => void;
    checkPaymentStatus: () => Promise<PaymentStatus | null>;
    isPolling: boolean;
};

interface BraidPayWebhookPayload {
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
/**
 * Verify the BraidPay webhook signature
 *
 * @param webhookSecret The webhook secret from BraidPay dashboard
 * @param toAddress The payment destination address
 * @param amount The payment amount
 * @param signature The signature from the X-Webhook-Signature header
 * @returns boolean indicating if signature is valid
 */
declare function verifyWebhookSignature(webhookSecret: string, toAddress: string, amount: number, signature: string): boolean;
type BraidPayWebhookHandler = (payload: BraidPayWebhookPayload) => Promise<void> | void;
interface BraidPayWebhookProcessorOptions {
    webhookSecret: string;
    onCompleted?: BraidPayWebhookHandler;
    onPending?: BraidPayWebhookHandler;
    onError?: (error: Error) => void;
}
/**
 * Process a BraidPay webhook request
 *
 * @param payload The webhook payload
 * @param signature The signature from X-Webhook-Signature header
 * @param options Configuration options including handlers
 * @returns Object with success flag and any error message
 */
declare function processBraidPayWebhook(payload: BraidPayWebhookPayload, signature: string, options: BraidPayWebhookProcessorOptions): Promise<{
    success: boolean;
    error?: undefined;
} | {
    success: boolean;
    error: string;
}>;

declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>>;

declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

declare function cn(...inputs: ClassValue[]): string;

export { BraidPayButton, type BraidPayButtonProps, type BraidPayWebhookHandler$1 as BraidPayWebhookHandler, type BraidPayWebhookPayload$1 as BraidPayWebhookPayload, type BraidPayWebhookProcessorOptions$1 as BraidPayWebhookProcessorOptions, Button, type ButtonProps, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Input, type InputProps, Label, type PaymentCompleteData, PaymentForm, type PaymentFormProps, type PaymentStatus, type PaymentVerificationOptions, cn, processBraidPayWebhook, usePaymentVerification, verifyWebhookSignature };
