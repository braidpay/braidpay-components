"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import { Button } from "./ui/button"
import type { ButtonProps } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog"

export interface BraidPayButtonProps extends Omit<ButtonProps, 'onClick'> {
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
export default function BraidPayButton({
  paymentLink,
  buttonText = "Pay with USDC",
  children,
  onPaymentComplete,
  className = "",
  dialogClassName = "",
  iframeHeight = "580px",
  initialOpen = false,
  ...buttonProps
}: BraidPayButtonProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(initialOpen)

  // Handle initial open state
  useEffect(() => {
    setIsPaymentModalOpen(initialOpen);
  }, [initialOpen]);

  // Handle message events from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Implement if BraidPay provides postMessage communication
      if (event.origin === new URL(paymentLink).origin) {
        if (event.data?.type === 'payment_complete') {
          if (onPaymentComplete) {
            onPaymentComplete(event.data);
          }
          setIsPaymentModalOpen(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [paymentLink, onPaymentComplete]);

  return (
    <>
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogTrigger asChild>
          <Button 
            className={className}
            {...buttonProps}
          >
            {children || buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent 
          className={`max-w-4xl w-full !h-[90vh] p-0 bg-background ${dialogClassName}`}
          aria-describedby="payment-dialog-description"
        >
          <div id="payment-dialog-description" className="sr-only">
            BraidPay payment window. You can make a payment using USDC or other stablecoins.
          </div>
          <div className="relative h-full flex flex-col">
            <div className="flex-1">
              <iframe 
                src={paymentLink}
                className="w-full h-full border-0 rounded-md shadow-sm"
                style={{ height: iframeHeight }}
                allow="payment"
                title="BraidPay Payment Form"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 