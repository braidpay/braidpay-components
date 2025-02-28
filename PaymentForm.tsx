"use client"

import * as React from "react"
import { useState, FormEvent, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent } from "./ui/card"
import { CheckCircle2 } from "lucide-react"
import BraidPayButton from "./BraidPayButton"
import usePaymentVerification from "./hooks/usePaymentVerification"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

interface PaymentFormProps {
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
export default function PaymentForm({
  paymentLinkID,
  paymentLink,
  productName,
  price,
  currency = "$",
  onPaymentComplete,
  successMessage = "Thank you for your purchase! Your access has been granted.",
  buttonText = "Pay Now",
  className = "",
}: PaymentFormProps) {
  const [email, setEmail] = useState("")
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const { 
    status, 
    registerPayment, 
    isPolling 
  } = usePaymentVerification({
    paymentLinkID,
    pollingInterval: 3000,
    onPaymentComplete: (status) => {
      if (onPaymentComplete) {
        onPaymentComplete(status);
      }
      // Close payment modal when payment is complete
      setIsPaymentModalOpen(false);
    }
  });

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      registerPayment(email);
      setIsEmailSubmitted(true);
      // Automatically open the payment modal after email submission
      setIsPaymentModalOpen(true);
    }
  };

  // Close the polling message and reset form if payment modal is closed
  const handlePaymentModalChange = (open: boolean) => {
    setIsPaymentModalOpen(open);
    if (!open && !status.success) {
      // Only reset if payment was not successful
      setIsEmailSubmitted(false);
    }
  };

  return (
    <div className={className}>
      {status.success && status.shouldShowSuccess ? (
        <Card className="w-full bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center p-4">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold text-green-800">{successMessage}</h2>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">{productName}</h3>
                <div className="text-xl font-bold">{currency}{price}</div>
              </div>
              
              {!isEmailSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="youremail@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">Continue to Payment</Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-md text-blue-800 text-sm">
                    {isPolling ? 
                      "We're waiting to confirm your payment. This dialog will automatically update when your payment is processed." :
                      "Click the button below to complete your payment."
                    }
                  </div>
                  
                  <Button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full"
                  >
                    {buttonText}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Dialog */}
      <Dialog open={isPaymentModalOpen} onOpenChange={handlePaymentModalChange}>
        <DialogContent className="max-w-4xl w-full !h-[90vh] p-0 bg-background">
          <div className="relative h-full flex flex-col">
            <div className="flex-1">
              <iframe 
                src={paymentLink}
                className="w-full h-full border-0 rounded-md shadow-sm"
                allow="payment"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 