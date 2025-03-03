"use client"

import { useState, useEffect, useCallback } from 'react';

interface PaymentStatus {
  success: boolean;
  isPending?: boolean;
  shouldShowSuccess?: boolean;
  message?: string;
}

interface UsePaymentVerificationOptions {
  paymentLinkID: string;
  email?: string;
  pollingInterval?: number;
  verificationEndpoint?: string;
  onPaymentComplete?: (status: PaymentStatus) => void;
}

/**
 * Hook for verifying BraidPay payment status
 * 
 * @param options Configuration options
 * @returns Object with payment status and methods to register and check payment
 */
export function usePaymentVerification({
  paymentLinkID,
  email,
  pollingInterval = 5000,
  verificationEndpoint = '/api/check-payment-status',
  onPaymentComplete,
}: UsePaymentVerificationOptions) {
  const [status, setStatus] = useState<PaymentStatus>({ success: false });
  const [isPolling, setIsPolling] = useState(false);
  const [userEmail, setUserEmail] = useState(email || '');

  // Register a payment attempt
  const registerPayment = useCallback(async (email: string) => {
    if (!email || !paymentLinkID) return;
    
    setUserEmail(email);
    
    try {
      const response = await fetch(verificationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'register',
          email: email.toLowerCase(),
          paymentLinkID,
        }),
      });
      
      if (response.ok) {
        setIsPolling(true);
      }
    } catch (error) {
      console.error('Error registering payment:', error);
    }
  }, [paymentLinkID, verificationEndpoint]);

  // Check payment status
  const checkPaymentStatus = useCallback(async () => {
    if (!userEmail || !paymentLinkID) return;
    
    try {
      const response = await fetch(verificationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail.toLowerCase(),
          paymentLinkID,
        }),
      });
      
      const result = await response.json();
      
      setStatus(result);
      
      // If payment is successful, stop polling
      if (result.success) {
        setIsPolling(false);
        if (onPaymentComplete) {
          onPaymentComplete(result);
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error checking payment status:', error);
      setStatus({ success: false, message: 'Error checking payment status' });
      return { success: false };
    }
  }, [userEmail, paymentLinkID, verificationEndpoint, onPaymentComplete]);

  // Start polling when email and polling flag are set
  useEffect(() => {
    if (!isPolling || !userEmail) return;
    
    const interval = setInterval(checkPaymentStatus, pollingInterval);
    
    return () => clearInterval(interval);
  }, [isPolling, userEmail, checkPaymentStatus, pollingInterval]);

  return {
    status,
    registerPayment,
    checkPaymentStatus,
    isPolling,
  };
} 