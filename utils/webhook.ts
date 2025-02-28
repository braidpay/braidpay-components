import type { BraidPayWebhookPayload, BraidPayWebhookProcessorOptions } from '../types';
import crypto from 'crypto';

export function verifyWebhookSignature(
  webhookSecret: string,
  toAddress: string,
  amount: number,
  signature: string
): boolean {
  const message = `${toAddress}:${amount}`;
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(message)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function processBraidPayWebhook(
  payload: BraidPayWebhookPayload,
  signature: string,
  options: BraidPayWebhookProcessorOptions
): Promise<{ success: boolean; error?: string }> {
  try {
    const isValid = verifyWebhookSignature(
      options.webhookSecret,
      payload.toAddress,
      payload.amount,
      signature
    );

    if (!isValid) {
      return { success: false, error: 'Invalid signature' };
    }

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