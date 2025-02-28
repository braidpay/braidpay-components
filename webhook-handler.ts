import crypto from 'crypto-browserify';

// BraidPay webhook payload interface
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
  [key: string]: unknown; // Allow for additional custom fields
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
export function verifyWebhookSignature(
  webhookSecret: string, 
  toAddress: string, 
  amount: number, 
  signature: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(`${toAddress}${amount}`)
    .digest('hex');
  
  return signature === expectedSignature;
}

// Type for the handler function
export type BraidPayWebhookHandler = (payload: BraidPayWebhookPayload) => Promise<void> | void;

// Options for the webhook processor
export interface BraidPayWebhookProcessorOptions {
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
export async function processBraidPayWebhook(
  payload: BraidPayWebhookPayload,
  signature: string,
  options: BraidPayWebhookProcessorOptions
) {
  try {
    // Verify signature
    if (!verifyWebhookSignature(
      options.webhookSecret,
      payload.toAddress,
      payload.amount,
      signature
    )) {
      throw new Error('Invalid webhook signature');
    }

    // Process based on status
    if (payload.status === 'COMPLETED' && options.onCompleted) {
      await options.onCompleted(payload);
    } else if (payload.status === 'PENDING' && options.onPending) {
      await options.onPending(payload);
    }

    return { success: true };
  } catch (error) {
    if (options.onError && error instanceof Error) {
      options.onError(error);
    }
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
} 