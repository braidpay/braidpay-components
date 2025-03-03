import { useState, useEffect, useCallback } from 'react';
import type { PaymentVerificationOptions, PaymentStatus } from '../types';

// Proper email validation function
const isValidEmail = (email: string): boolean => {
  // RFC 5322 compliant regex for email validation
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

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
      if (!email) {
        throw new Error('Email is required');
      }
      
      if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
      }

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
    // Validate email before setting
    if (!isValidEmail(newEmail)) {
      console.error('Invalid email format:', newEmail);
      setStatus({
        success: false,
        isPending: false,
        shouldShowSuccess: false,
        error: 'Invalid email format'
      });
      return;
    }
    
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