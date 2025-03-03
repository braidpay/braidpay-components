import type { BraidPayWebhookPayload, BraidPayWebhookProcessorOptions } from '../types';
import crypto from 'crypto-browserify';

// Default timeout for webhook verification (15 minutes)
const DEFAULT_TIMESTAMP_TOLERANCE_MS = 15 * 60 * 1000;

/**
 * Verify the BraidPay webhook signature
 * Security-critical function that validates webhooks came from BraidPay
 * 
 * @param webhookSecret The webhook secret from BraidPay dashboard
 * @param toAddress The payment destination address
 * @param amount The payment amount
 * @param signature The signature from the X-Webhook-Signature header
 * @param timestampToleranceMs Optional timestamp tolerance in milliseconds to prevent replay attacks
 * @returns boolean indicating if signature is valid
 */
export function verifyWebhookSignature(
  webhookSecret: string,
  toAddress: string,
  amount: number,
  signature: string,
  timestampToleranceMs: number = DEFAULT_TIMESTAMP_TOLERANCE_MS
): boolean {
  try {
    // Check if the webhook payload has a timestamp and it's within tolerance
    // This helps prevent replay attacks
    if (arguments.length > 5) {
      const timestamp = arguments[5] as string | undefined;
      if (timestamp) {
        const webhookTime = new Date(timestamp).getTime();
        const currentTime = Date.now();
        
        if (isNaN(webhookTime) || Math.abs(currentTime - webhookTime) > timestampToleranceMs) {
          console.warn('Webhook timestamp outside of tolerance window');
          return false;
        }
      }
    }

    // Generate the expected signature
    // Format must be ${toAddress}${amount} without any separator
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(`${toAddress}${amount}`)
      .digest('hex');

    // Implement constant-time comparison to prevent timing attacks
    // This is a browser-compatible implementation of timing-safe equal
    if (expectedSignature.length !== signature.length) {
      return false;
    }
    
    // Convert both to strings to ensure charCodeAt works
    const expectedStr = String(expectedSignature);
    const signatureStr = String(signature);
    
    let result = 0;
    for (let i = 0; i < expectedStr.length; i++) {
      result |= expectedStr.charCodeAt(i) ^ signatureStr.charCodeAt(i);
    }
    
    return result === 0;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
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
): Promise<{ success: boolean; error?: string }> {
  try {
    // Verify signature
    const isValid = verifyWebhookSignature(
      options.webhookSecret,
      payload.toAddress,
      payload.amount,
      signature
    );

    if (!isValid) {
      return { success: false, error: 'Invalid signature' };
    }

    // Process based on status
    if (payload.status === 'COMPLETED' && options.onCompleted) {
      await options.onCompleted(payload);
    } else if (payload.status === 'PENDING' && options.onPending) {
      await options.onPending(payload);
    }

    return { success: true };
  } catch (error) {
    if (options.onError) {
      options.onError(error as Error);
    }
    return {
      success: false,
      error: (error as Error).message || 'Failed to process webhook',
    };
  }
} 