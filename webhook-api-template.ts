import { NextRequest, NextResponse } from 'next/server';
import { 
  BraidPayWebhookPayload, 
  processBraidPayWebhook 
} from './webhook-handler';

/**
 * Example BraidPay webhook API route handler
 * 
 * This is a template that you can use in your Next.js app/api/braidpay-webhook/route.ts file
 * Customize the onCompleted and onPending functions to handle payments as needed
 */
export async function POST(req: NextRequest) {
  try {
    // Get the signature from the headers
    const signature = req.headers.get('x-webhook-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const payload: BraidPayWebhookPayload = await req.json();
    
    // Get the webhook secret from environment variables
    const webhookSecret = process.env.BRAIDPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('BraidPay webhook secret not configured');
      return NextResponse.json(
        { error: 'Configuration error' },
        { status: 500 }
      );
    }

    // Process the webhook
    const result = await processBraidPayWebhook(payload, signature, {
      webhookSecret,
      
      // Handle completed payments
      onCompleted: async (payload) => {
        if (payload.Payer_Email) {
          const email = payload.Payer_Email.toLowerCase();
          
          // TODO: Replace with your own database operations
          console.log(`Payment completed for ${email}`);
          console.log(`Payment ID: ${payload.paymentID}`);
          console.log(`Amount: ${payload.amount} ${payload.token}`);
          
          // TODO: Update your database to mark the payment as completed
          // TODO: Grant access to purchased content, send confirmation email, etc.
        }
      },
      
      // Handle pending payments (optional)
      onPending: async (payload) => {
        if (payload.Payer_Email) {
          const email = payload.Payer_Email.toLowerCase();
          
          // TODO: Replace with your own database operations
          console.log(`Payment pending for ${email}`);
          console.log(`Payment ID: ${payload.paymentID}`);
        }
      },
      
      // Handle errors (optional)
      onError: (error) => {
        console.error('Webhook processing error:', error);
      }
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 