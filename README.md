# BraidPay Components

A comprehensive collection of React components for seamlessly integrating BraidPay stablecoin payments into your Next.js applications.

[![npm version](https://img.shields.io/npm/v/braidpay-components.svg)](https://www.npmjs.com/package/braidpay-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🔒 **Secure**: Built-in webhook signature verification
- 🚀 **Easy to Use**: Simple drop-in components
- 🔄 **Real-time Updates**: Automatic payment status polling
- 🎨 **Customizable**: Style components to match your brand
- 📱 **Responsive**: Works on all devices
- 🧩 **Modular**: Use only what you need
- 🤖 **LLM-Friendly**: Easy to understand structure for AI-assisted coding

## Prerequisites

Before using BraidPay components, you need to set up three essential elements from your BraidPay dashboard:

1. **Payment Link ID** (`paymentLinkID`): 
   - Required for payment verification and webhook handling
   - Found in your BraidPay dashboard under Payment Links
   - Format: A unique identifier
   - Required for: `PaymentForm`, `usePaymentVerification` hook

2. **Payment Link** (`paymentLink`):
   - The full URL where customers make payments
   - Format: `https://app.braidpay.com/p/your-payment-link`
   - Found in your BraidPay dashboard under Payment Links
   - Required for: `PaymentForm`, `BraidPayButton`

3. **Webhook Secret** (`BRAIDPAY_WEBHOOK_SECRET`):
   - Required for secure webhook verification
   - Generate from BraidPay dashboard under Settings > Webhooks
   - Must be stored securely in environment variables
   - Add to your `.env.local`:
     ```
     BRAIDPAY_WEBHOOK_SECRET=your_webhook_secret_here
     ```

⚠️ **Important**: All three elements above must be properly configured for the payment system to work correctly. Make sure to:
- Keep your webhook secret secure and never expose it in client-side code
- Use the correct payment link ID that corresponds to your payment link
- Test your webhook endpoint with the provided testing tools

## Installation

### Simple Installation

The package includes all necessary UI components and dependencies:

```bash
# Using npm
npm install braidpay-components

# Using yarn
yarn add braidpay-components

# Using pnpm
pnpm add braidpay-components
```

If you encounter dependency conflicts, you can use:
```bash
npm install braidpay-components --legacy-peer-deps
# or
npm install braidpay-components --force
```

### Tailwind CSS Configuration

Add the following to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    // ... your existing content paths
    "./node_modules/braidpay-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
}
```

Add the following CSS variables to your global CSS file:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

### Usage

Import and use BraidPay components in your application:

```tsx
import { PaymentForm } from 'braidpay-components';

export default function CheckoutPage() {
  return (
    <PaymentForm
      paymentLinkID="your-payment-link-id"
      paymentLink="https://app.braidpay.com/p/your-payment-link"
      productName="Premium Course"
      price={99}
      currency="$"
      onPaymentComplete={(status) => {
        console.log('Payment completed:', status);
        // Handle successful payment
      }}
    />
  );
}
```

### Troubleshooting Installation

If you encounter any issues during installation:

1. **Automatic Installation Failed**
   - Check the error message in the console
   - Try running the installation script manually:
     ```bash
     npx install-braidpay-ui
     ```
   - If that fails, follow the manual installation steps above

2. **Dependency Conflicts**
   Use one of these approaches:
   ```bash
   # Option 1: Use legacy peer deps
   npm install braidpay-components --legacy-peer-deps

   # Option 2: Use force
   npm install braidpay-components --force

   # Option 3: Manual peer dependency resolution
   npm install lucide-react@latest
   ```

3. **Module Resolution Errors**
   If you see errors about missing modules like `@/components/ui/button`, verify:
   - Components are in the correct location (`components/ui/`)
   - Your `tsconfig.json` has the correct path aliases:
     ```json
     {
       "compilerOptions": {
         "paths": {
           "@/*": ["./*"]
         }
       }
     }
     ```

## Component Documentation

### 1. PaymentForm

A comprehensive payment form that collects email, integrates with BraidPay, and verifies payment status.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `paymentLinkID` | string | Yes | - | The BraidPay payment link ID for webhook verification |
| `paymentLink` | string | Yes | - | The BraidPay payment link URL |
| `productName` | string | Yes | - | Name of the product being purchased |
| `price` | number \| string | Yes | - | Price of the product |
| `currency` | string | No | "$" | Currency symbol |
| `onPaymentComplete` | function | No | - | Callback when payment is completed |
| `successMessage` | string | No | "Thank you for your purchase! Your access has been granted." | Message to show on successful payment |
| `buttonText` | string | No | "Pay Now" | Text to display on the payment button |
| `className` | string | No | "" | Optional CSS class for the form container |

#### Example

```tsx
import { PaymentForm } from 'braidpay-components';

export default function CheckoutPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Premium Course</h1>
      
      <PaymentForm
        paymentLinkID="your-payment-link-id"
        paymentLink="https://app.braidpay.com/p/your-payment-link"
        productName="Premium Course"
        price={99}
        currency="$"
        buttonText="Get Access Now"
        successMessage="Thank you for your purchase! You now have access to the premium course."
        onPaymentComplete={(status) => {
          // Handle completed payment
          console.log('Payment completed:', status);
        }}
      />
    </div>
  );
}
```

### 2. BraidPayButton

A simple button component that opens a dialog with a BraidPay payment iframe.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `paymentLink` | string | Yes | - | The BraidPay payment link URL |
| `buttonText` | string | No | "Pay with USDC" | Text to display on the button |
| `children` | ReactNode | No | - | Optional custom content for the button |
| `onPaymentComplete` | function | No | - | Optional callback function when payment is completed |
| `className` | string | No | "" | Optional CSS class for the button |
| `dialogClassName` | string | No | "" | Optional CSS class for the dialog |
| `iframeHeight` | string \| number | No | "580px" | Optional height for the iframe |
| `initialOpen` | boolean | No | false | Whether the payment dialog should open initially |
| `...buttonProps` | ButtonProps | No | - | Any other props are passed to the underlying Button component |

#### Example

```tsx
import { BraidPayButton } from 'braidpay-components';

export default function DonationPage() {
  return (
    <div className="text-center p-6">
      <h2 className="text-xl font-bold mb-4">Support Our Project</h2>
      <p className="mb-6">Help us continue building great tools!</p>
      
      <BraidPayButton
        paymentLink="https://app.braidpay.com/p/your-payment-link"
        buttonText="Donate with USDC"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        onPaymentComplete={(data) => {
          console.log('Donation received:', data);
          alert('Thank you for your donation!');
        }}
      >
        Support Our Work
      </BraidPayButton>
    </div>
  );
}
```

### 3. usePaymentVerification Hook

A React hook for verifying BraidPay payment status.

#### Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `paymentLinkID` | string | Yes | - | The BraidPay payment link ID |
| `email` | string | No | "" | Initial email to check (optional) |
| `pollingInterval` | number | No | 5000 | Milliseconds between polling checks |
| `verificationEndpoint` | string | No | '/api/check-payment-status' | API endpoint for checking payment status |
| `onPaymentComplete` | function | No | - | Callback function when payment is completed |

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `status` | object | Payment status object with success, isPending, and other properties |
| `registerPayment` | function | Function to register a payment attempt with an email |
| `checkPaymentStatus` | function | Function to manually check payment status |
| `isPolling` | boolean | Whether the hook is currently polling for updates |

#### Example

```tsx
import { usePaymentVerification } from 'braidpay-components';

export default function PaymentStatus() {
  const [email, setEmail] = useState('');
  
  const { 
    status, 
    registerPayment,
    checkPaymentStatus,
    isPolling
  } = usePaymentVerification({
    paymentLinkID: 'your-payment-link-id',
    onPaymentComplete: (status) => {
      console.log('Payment completed:', status);
      // Handle success (e.g., show confirmation, unlock content)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      registerPayment(email);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button type="submit">Check Payment</button>
      </form>

      {isPolling && <p>Checking payment status...</p>}
      
      {status.success ? (
        <div className="success-message">Payment confirmed!</div>
      ) : (
        <div>No payment found or payment pending</div>
      )}
    </div>
  );
}
```

## Webhook Integration

### 1. Set up the Webhook API Route

Create a webhook handler in your Next.js app. This example uses Next.js App Router:

```tsx
// app/api/braidpay-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { 
  BraidPayWebhookPayload, 
  processBraidPayWebhook 
} from 'braidpay-components';

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-webhook-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const payload: BraidPayWebhookPayload = await req.json();
    const webhookSecret = process.env.BRAIDPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('BraidPay webhook secret not configured');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const result = await processBraidPayWebhook(payload, signature, {
      webhookSecret,
      onCompleted: async (payload) => {
        if (payload.Payer_Email) {
          // Update your database, grant access, etc.
          console.log(`Payment completed for ${payload.Payer_Email}`);
          
          // Example: Update user in database
          await updateUserSubscription(payload.Payer_Email, payload.paymentLinkID);
          
          // Example: Send confirmation email
          await sendConfirmationEmail(payload.Payer_Email, payload.amount);
        }
      }
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### 2. Configure Environment Variables

Add the following to your `.env.local` file:

```
BRAIDPAY_WEBHOOK_SECRET=your_webhook_secret_from_braidpay_dashboard
```

### 3. Configure the Webhook in BraidPay Dashboard

1. Navigate to Settings > Webhooks in your BraidPay dashboard
2. Enter your webhook URL (e.g., `https://yourdomain.com/api/braidpay-webhook`)
3. Generate and copy the webhook secret
4. Save your configuration

## Webhook Best Practices

### Idempotency Handling

Webhooks may be delivered multiple times for the same event. To handle this:

```typescript
// Store processed payment IDs (use a database in production)
const processedPayments = new Set<string>();

// In your webhook handler
export async function POST(req: NextRequest) {
  const payload: BraidPayWebhookPayload = await req.json();
  
  // Check if payment was already processed
  if (processedPayments.has(payload.paymentID)) {
    return NextResponse.json({ received: true });
  }
  
  // Process the payment
  await processBraidPayWebhook(/* ... */);
  
  // Mark as processed
  processedPayments.add(payload.paymentID);
}
```

### Error Recovery

If webhook processing fails:

1. Return a non-200 status code to trigger a retry
2. Implement exponential backoff in your error handling
3. Log failed webhooks for manual review

```typescript
export async function POST(req: NextRequest) {
  try {
    // Process webhook
    const result = await processBraidPayWebhook(/* ... */);
    
    if (!result.success) {
      // Log error for monitoring
      console.error('Webhook processing failed:', result.error);
      
      // Return 500 to trigger retry
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    // Log unexpected errors
    console.error('Webhook error:', error);
    
    // Return 500 to trigger retry
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Testing Webhook Integration

To test your webhook integration:

1. **Local Testing**
   ```bash
   # Start your development server
   npm run dev
   
   # Use ngrok to expose your local server
   ngrok http 3000
   
   # Configure the ngrok URL in BraidPay dashboard
   # https://<your-ngrok-url>/api/braidpay-webhook
   ```

2. **Test Environment**
   - Use BraidPay's test environment for development
   - Test payment links have the format: `https://test.braidpay.com/p/...`
   - Test tokens are available on supported test networks

3. **Webhook Simulator**
   ```typescript
   // Test utility to simulate webhook delivery
   async function simulateWebhook(payload: Partial<BraidPayWebhookPayload>) {
     const testPayload = {
       paymentLinkID: 'test_link_id',
       paymentID: 'test_payment_' + Date.now(),
       fromAddress: '0x123...',
       toAddress: '0x456...',
       hash: '0x789...',
       network: 'POLYGON',
       token: 'USDC',
       amount: 100,
       status: 'COMPLETED',
       createdAt: new Date().toISOString(),
       updatedAt: new Date().toISOString(),
       ...payload
     };
     
     const signature = crypto
       .createHmac('sha256', 'test_secret')
       .update(`${testPayload.toAddress}${testPayload.amount}`)
       .digest('hex');
     
     // Send test webhook
     const response = await fetch('/api/braidpay-webhook', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'X-Webhook-Signature': signature
       },
       body: JSON.stringify(testPayload)
     });
     
     return response.json();
   }
   ```

## Advanced Usage

### Custom Styling

All components accept className props for customization:

```tsx
<PaymentForm
  paymentLinkID="your-payment-link-id"
  paymentLink="https://app.braidpay.com/p/your-payment-link"
  productName="Premium Content"
  price={49.99}
  className="my-custom-form"
  buttonText="Unlock Premium"
/>
```

### Integration with Database

Here's a common pattern for integrating with a database:

```tsx
// In your webhook handler
onCompleted: async (payload) => {
  if (payload.Payer_Email && payload.status === 'COMPLETED') {
    // Using your database client (e.g., Prisma, Mongoose, etc.)
    const user = await db.user.findUnique({
      where: { email: payload.Payer_Email.toLowerCase() }
    });
    
    if (user) {
      // Update user with purchased product access
      await db.user.update({
        where: { id: user.id },
        data: {
          subscriptions: {
            create: {
              productId: payload.paymentLinkID,
              purchaseDate: new Date(),
              expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
              transactionId: payload.paymentID,
              amount: payload.amount
            }
          }
        }
      });
      
      // Send confirmation email
      await sendEmail({
        to: user.email,
        subject: 'Your Purchase Confirmation',
        body: `Thank you for your purchase of $${payload.amount}!`
      });
    }
  }
}
```

### Multiple Payment Options

You can offer multiple payment options by using multiple BraidPayButton components:

```tsx
<div className="payment-options">
  <h3>Choose Your Payment Method</h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="p-4 border rounded-md">
      <h4>One-time Payment</h4>
      <p>Get lifetime access with a single payment</p>
      <BraidPayButton
        paymentLink="https://app.braidpay.com/p/one-time-payment-link"
        buttonText="Pay Once ($99)"
        className="mt-4 w-full"
      />
    </div>
    
    <div className="p-4 border rounded-md">
      <h4>Subscription</h4>
      <p>Low monthly payment with continuous updates</p>
      <BraidPayButton
        paymentLink="https://app.braidpay.com/p/subscription-payment-link"
        buttonText="Subscribe ($9.99/mo)"
        className="mt-4 w-full"
      />
    </div>
  </div>
</div>
```

## Webhook Payload Reference

The BraidPay webhook payload contains:

```typescript
interface BraidPayWebhookPayload {
  paymentLinkID: string;   // The BraidPay payment link ID
  paymentID: string;       // Unique payment identifier
  fromAddress: string;     // Sender's crypto address
  toAddress: string;       // Recipient's crypto address
  hash: string;            // Blockchain transaction hash
  network: 'ETHEREUM' | 'POLYGON' | 'BASE' | 'SOLANA';
  token: 'USDC' | 'USDT' | 'PYUSD';
  amount: number;          // Payment amount
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
  Payer_Email?: string;    // Email of payer if provided
  [key: string]: unknown;  // Additional custom fields
}
```

## Troubleshooting

### Payment Dialog Not Opening

If the payment dialog doesn't open:

```tsx
// Make sure you're setting the isPaymentModalOpen state correctly
const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

// When ready to show payment
setIsPaymentModalOpen(true);

// Check that your Dialog component is properly configured
<Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
  <DialogContent>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

### Payment Verification Not Working

If payment verification isn't working:

1. Ensure your webhook is properly configured in the BraidPay dashboard
2. Check that your .env.local file contains the correct BRAIDPAY_WEBHOOK_SECRET
3. Verify your API route is correctly handling the webhook
4. Check browser console for any errors in the payment verification process

### Common Error: Missing Payment Link ID

```
Error: Payment link ID is required for verification

// Fix: Always provide the paymentLinkID
usePaymentVerification({
  paymentLinkID: "your-payment-link-id", // Required!
  // other options
});
```

## API Reference

### Webhook Handler Functions

#### `verifyWebhookSignature`

```typescript
function verifyWebhookSignature(
  webhookSecret: string, 
  toAddress: string, 
  amount: number, 
  signature: string
): boolean
```

#### `processBraidPayWebhook`

```typescript
function processBraidPayWebhook(
  payload: BraidPayWebhookPayload,
  signature: string,
  options: BraidPayWebhookProcessorOptions
): Promise<{ success: boolean; error?: string }>
```

### Types

```typescript
interface BraidPayWebhookProcessorOptions {
  webhookSecret: string;
  onCompleted?: BraidPayWebhookHandler;
  onPending?: BraidPayWebhookHandler;
  onError?: (error: Error) => void;
}

type BraidPayWebhookHandler = (payload: BraidPayWebhookPayload) => Promise<void> | void;
```

## Security Considerations

1. **Store Secrets Securely**: Never expose your BRAIDPAY_WEBHOOK_SECRET in client-side code
2. **Verify Signatures**: Always verify webhook signatures to prevent fraud
3. **Use HTTPS**: Ensure all API endpoints use HTTPS
4. **Implement Idempotency**: Handle duplicate webhook deliveries gracefully
5. **Sanitize Inputs**: Validate and sanitize all user inputs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## About BraidPay

[BraidPay](https://braidpay.com) is a stablecoin payment processing platform that enables businesses to accept payments in USDC, USDT, and PYUSD on multiple blockchains.

---

Created with ❤️  