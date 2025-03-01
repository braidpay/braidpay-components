/**
 * BraidPay Webhook API Route Template for Next.js App Router
 * 
 * Copy this file to your Next.js project as:
 * app/api/braidpay-webhook/route.ts
 * 
 * Make sure to:
 * 1. Add BRAIDPAY_WEBHOOK_SECRET to your .env.local file
 * 2. Update the onCompleted function with your business logic
 * 3. Configure this webhook URL in your BraidPay dashboard
 */

// These imports will work in your project after installing braidpay-components
// You may need to install next if not already installed
import type { NextRequest, NextResponse } from 'next/server';
import type { BraidPayWebhookPayload } from 'braidpay-components';
import { processBraidPayWebhook } from 'braidpay-components';

// In this template file, we're just declaring the types for demonstration
// You'll have the proper imports when you copy this to your Next.js project
declare const NextResponse: any;

// Optional: Track processed payments to handle duplicates
const processedPayments = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    // Extract the signature from headers
    const signature = req.headers.get('x-webhook-signature');
    if (!signature) {
      console.error('Missing webhook signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    // Parse the webhook payload
    const payload: BraidPayWebhookPayload = await req.json();

    // Validate required fields
    if (!payload.paymentID || !payload.toAddress || !payload.amount) {
      console.error('Webhook payload missing required fields');
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Optional: Check for duplicate webhook deliveries
    if (processedPayments.has(payload.paymentID)) {
      console.log(`Payment ${payload.paymentID} already processed (idempotency check)`);
      return NextResponse.json({ received: true, note: 'Already processed' });
    }

    // Get the webhook secret from environment variables
    const webhookSecret = process.env.BRAIDPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Webhook secret not configured in environment variables');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    // Process the webhook
    const result = await processBraidPayWebhook(payload, signature, {
      webhookSecret,
      
      // Handle completed payments
      onCompleted: async (payment: BraidPayWebhookPayload) => {
        try {
          console.log(`Processing completed payment: ${payment.paymentID}`);
          
          // IMPORTANT: Implement your business logic here
          // Examples:
          // - Update user subscription in database
          // - Grant access to content
          // - Send confirmation email
          // - Record the transaction
          
          if (payment.Payer_Email) {
            // Example: Update user in database
            // await db.user.update({
            //   where: { email: payment.Payer_Email.toLowerCase() },
            //   data: { 
            //     hasPaid: true,
            //     amountPaid: payment.amount,
            //     paymentDate: new Date(),
            //     transactionId: payment.paymentID
            //   }
            // });
            
            // Example: Send confirmation email
            // await sendEmail({
            //   to: payment.Payer_Email,
            //   subject: 'Payment Confirmation',
            //   body: `Thank you for your payment of ${payment.amount} ${payment.token}`
            // });
          }
          
          // Mark as processed for idempotency
          processedPayments.add(payment.paymentID);
          
        } catch (error) {
          console.error('Error in onCompleted handler:', error);
          // Continue processing to return 200 to BraidPay
          // but log the error for investigation
        }
      },
      
      // Optional: Handle pending payments
      onPending: async (payment: BraidPayWebhookPayload) => {
        console.log(`Received pending payment notification: ${payment.paymentID}`);
        // You can implement logic for pending payments
        // such as showing "Processing" status to users
      },
      
      // Handle errors
      onError: (error: Error) => {
        console.error('Webhook processing error:', error);
      }
    });

    // Return appropriate response based on processing result
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Return success response
    return NextResponse.json({ received: true });
    
  } catch (error) {
    // Catch any unexpected errors
    console.error('Unhandled webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 