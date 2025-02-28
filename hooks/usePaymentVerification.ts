import { useState, useEffect, useCallback } from 'react';
import type { PaymentVerificationOptions, PaymentStatus } from '../types';

export default function usePaymentVerification({
  paymentLinkID,
  email: initialEmail = '',
  pollingInterval = 5000,
  verificationEndpoint = '/api/check-payment-status',
  onPaymentComplete,
}: PaymentVerificationOptions) {
  const [status, setStatus] = useState<PaymentStatus>({
    success: false,
    isPending: false,
    shouldShowSuccess: false
  });
  const [email, setEmail] = useState(initialEmail);
  const [isPolling, setIsPolling] = useState(false);

  const checkPaymentStatus = useCallback(async () => {
    try {
      const response = await fetch(verificationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentLinkID,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to check payment status');
      }

      const data = await response.json();
      
      const newStatus: PaymentStatus = {
        success: data.success,
        isPending: data.isPending || false,
        shouldShowSuccess: data.success && !data.isPending,
        error: data.error,
        data: data
      };

      setStatus(newStatus);

      if (newStatus.success && !newStatus.isPending && onPaymentComplete) {
        onPaymentComplete(newStatus);
        setIsPolling(false);
      }

      return newStatus;
    } catch (error) {
      console.error('Error checking payment status:', error);
      setStatus({
        success: false,
        isPending: false,
        shouldShowSuccess: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
      setIsPolling(false);
      return null;
    }
  }, [paymentLinkID, email, verificationEndpoint, onPaymentComplete]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPolling && email) {
      // Initial check
      checkPaymentStatus();

      // Set up polling
      intervalId = setInterval(checkPaymentStatus, pollingInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPolling, email, checkPaymentStatus, pollingInterval]);

  const registerPayment = useCallback((newEmail: string) => {
    setEmail(newEmail);
    setIsPolling(true);
    setStatus({
      success: false,
      isPending: true,
      shouldShowSuccess: false
    });
  }, []);

  return {
    status,
    registerPayment,
    checkPaymentStatus,
    isPolling,
  };
} 