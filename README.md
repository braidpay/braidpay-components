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
- Payment link ID is not a part of payment link itself and you should get it from BraidPay dashboard.
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

### Configuration for Next.js

The BraidPay components package uses Node.js modules like `crypto` which need to be polyfilled in browser environments. Here are different configuration options depending on your Next.js setup:

#### Why We Use Polyfills

BraidPay components use Node.js built-in modules like `crypto` for secure operations such as webhook signature verification. Since browsers don't natively support these Node.js APIs, we use "browserify" versions that provide compatible implementations for browser environments.

This approach allows you to:
- Use the same code in both server and client environments
- Have a simpler developer experience without managing separate API endpoints
- Implement BraidPay features with minimal configuration

#### Solution 1: Configuration for Next.js Pages Router

For Next.js applications using the Pages Router, update your `next.config.js`:

```js
const nextConfig = {
  // ...other config
  transpilePackages: ['braidpay-components'],
};

module.exports = nextConfig;
```

#### Solution 2: Configuration for Next.js App Router

For Next.js applications using the App Router, create or update your `next.config.js`:

```js
const webpack = require('webpack');

const nextConfig = {
  // ...other config
  webpack: (config) => {
    // Provide browser-compatible versions of Node.js built-in modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
    };
    
    // Ensure the global process and Buffer objects are available
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      })
    );
    
    return config;
  },
};

module.exports = nextConfig;
```

Also, install the required polyfill packages:

```bash
npm install crypto-browserify buffer process stream-browserify
```

#### Solution 3: Server Components Approach (Advanced)

If you're using server components and want to avoid polyfills completely, you can create a separate API route to handle webhook verification and payment processing on the server. This approach requires more setup but avoids including browserify polyfills in your client bundle.

```js
// app/api/verify-payment/route.ts
import { verifyWebhookSignature } from 'braidpay-components';

export async function POST(req: Request) {
  const data = await req.json();
  const { paymentId, signature, address, amount } = data;
  
  const isValid = verifyWebhookSignature(
    process.env.BRAIDPAY_WEBHOOK_SECRET!,
    address,
    amount,
    signature
  );
  
  return Response.json({ isValid });
}
```

Then call this API from your client components instead of using the client-side verification directly.

### Usage

Import and use BraidPay components in your application:

```tsx
"use client"
import { PaymentForm, BraidPayButton } from 'braidpay-components';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      
      <PaymentForm
        paymentLinkID="your-payment-link-id"
        paymentLink="your-payment-link"
        productName="Premium Subscription"
        price={99}
        onPaymentComplete={(status) => {
          console.log('Payment completed:', status);
        }}
      />
    </div>
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
"use client"
import { PaymentForm, BraidPayButton } from 'braidpay-components';

export default function CheckoutPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Premium Course</h1>
      
      <PaymentForm
        paymentLinkID="your-payment-link-id"
        paymentLink="your-payment-link"
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
"use client"
import { BraidPayButton } from 'braidpay-components';

export default function DonationPage() {
  return (
    <div className="text-center p-6">
      <h2 className="text-xl font-bold mb-4">Support Our Project</h2>
      <p className="mb-6">Help us continue building great tools!</p>
      
      <BraidPayButton
        paymentLink="your-payment-link"
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
"use client"
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
"use client"
import { processBraidPayWebhook } from 'braidpay-components';

export async function POST(req: Request) {
  const signature = req.headers.get('x-webhook-signature');
  const payload = await req.json();
  
  const result = await processBraidPayWebhook(
    payload,
    signature,
    {
      webhookSecret: process.env.BRAIDPAY_WEBHOOK_SECRET,
      onCompleted: async (paymentData) => {
        // Server-side payment processing
        await updateDatabase(paymentData);
      }
    }
  );
  
  return new Response(JSON.stringify({ success: result.success }), {
    status: result.success ? 200 : 400,
    headers: { 'Content-Type': 'application/json' }
  });
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
export async function POST(req: Request) {
  const payload: BraidPayWebhookPayload = await req.json();
  
  // Check if payment was already processed
  if (processedPayments.has(payload.paymentID)) {
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }
  
  // Process the payment
  const result = await processBraidPayWebhook(
    payload,
    signature,
    {
      webhookSecret: process.env.BRAIDPAY_WEBHOOK_SECRET,
      onCompleted: async (paymentData) => {
        if (paymentData.Payer_Email) {
          // Update your database, grant access, etc.
          console.log(`Payment completed for ${paymentData.Payer_Email}`);
          
          // Example: Update user in database
          await updateUserSubscription(paymentData.Payer_Email, paymentData.paymentLinkID);
          
          // Example: Send confirmation email
          await sendConfirmationEmail(paymentData.Payer_Email, paymentData.amount);
        }
      }
    }
  );

  // Mark as processed
  processedPayments.add(payload.paymentID);

  return new Response(JSON.stringify({ received: result.success }), { status: result.success ? 200 : 400 });
}
```

### Error Recovery

If webhook processing fails:

1. Return a non-200 status code to trigger a retry
2. Implement exponential backoff in your error handling
3. Log failed webhooks for manual review

```typescript
export async function POST(req: Request) {
  try {
    // Process webhook
    const result = await processBraidPayWebhook(
      payload,
      signature,
      {
        webhookSecret: process.env.BRAIDPAY_WEBHOOK_SECRET,
        onCompleted: async (paymentData) => {
          // Server-side payment processing
          await updateDatabase(paymentData);
        }
      }
    );
    
    if (!result.success) {
      // Log error for monitoring
      console.error('Webhook processing failed:', result.error);
      
      // Return 500 to trigger retry
      return new Response(JSON.stringify({ error: result.error }), { status: 500 });
    }
    
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    // Log unexpected errors
    console.error('Webhook error:', error);
    
    // Return 500 to trigger retry
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
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


2. **Webhook Simulator**
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
"use client"
import { PaymentForm, BraidPayButton } from 'braidpay-components';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      
      <PaymentForm
        paymentLinkID="your-payment-link-id"
        paymentLink="your-payment-link"
        productName="Premium Subscription"
        price={99}
        className="my-custom-form"
        buttonText="Unlock Premium"
      />
    </div>
  );
}
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
"use client"
import { BraidPayButton } from 'braidpay-components';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      
      <div className="payment-options">
        <h3>Choose Your Payment Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-md">
            <h4>One-time Payment</h4>
            <p>Get lifetime access with a single payment</p>
            <BraidPayButton
              paymentLink="first-payment-link"
              buttonText="Pay Options 1 ($99)"
              className="mt-4 w-full"
            />
          </div>
          
          <div className="p-4 border rounded-md">
            <h4>Subscription</h4>
            <p>Low monthly payment with continuous updates</p>
            <BraidPayButton
              paymentLink="second-payment-link"
              buttonText="Pay Options 2 ($9.99)"
              className="mt-4 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
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
  Payer_Email?: string;    // Email of payer
  [key: string]: unknown;  // Additional custom fields
}
```

## Troubleshooting

### Polyfill and Browser Compatibility Issues

If you encounter errors related to Node.js built-in modules in browser environments, they typically manifest as:

```
TypeError: Cannot read properties of undefined (reading 'version')
```

or

```
FatalRendererError: undefined is not an object (evaluating '(void 0).browser')
```

These errors occur because the browser environment is missing required Node.js polyfills.

#### Resolution Steps:

1. **Check your Next.js configuration**: Make sure you've properly configured the webpack polyfills as described in the "Configuration for Next.js" section.

2. **Verify polyfill installation**: Ensure all required polyfills are installed:
   ```bash
   npm install crypto-browserify buffer process stream-browserify
   ```

3. **Clear Next.js cache**: Sometimes clearing the Next.js cache can resolve polyfill issues:
   ```bash
   rm -rf .next
   npm run build
   ```

4. **Check component usage**: Ensure you're not using server-only components in client components without proper configuration.

5. **Environment variables**: Verify that required environment variables like `BRAIDPAY_WEBHOOK_SECRET` are properly set.

### Vercel Deployment Errors

If you encounter a "Module not found: Recursion in resolving" error during Vercel deployment, follow these steps:

1. **Create a custom Next.js config**: Create a `next.config.js` file with the following content:
   ```js
   const webpack = require('webpack');

   /** @type {import('next').NextConfig} */
   const nextConfig = {
     webpack: (config, { isServer }) => {
       // Only apply these changes on the client side build
       if (!isServer) {
         // Mark Node.js specific modules as external to prevent bundling issues
         config.resolve.fallback = {
           ...config.resolve.fallback,
           crypto: require.resolve('crypto-browserify'),
           stream: require.resolve('stream-browserify'),
           buffer: require.resolve('buffer'),
         };
         
         // Add webpack plugins to provide necessary globals
         config.plugins.push(
           new webpack.ProvidePlugin({
             process: 'process/browser',
             Buffer: ['buffer', 'Buffer'],
           })
         );
       }
       
       return config;
     },
   };

   module.exports = nextConfig;
   ```

2. **Install required polyfills**:
   ```bash
   npm install --save crypto-browserify stream-browserify buffer process
   ```

3. **Redeploy your application**:
   After making these changes, commit and push to trigger a new deployment.

If issues persist after trying these steps, please contact support or open an issue on our GitHub repository.

### Next.js Version Compatibility

BraidPay components are tested with:
- Next.js 13.x and 14.x
- React 18.x

For older versions, you may need additional configuration or polyfills.

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

## Webhook Security

BraidPay webhooks include a signature to verify the authenticity of the request. Each webhook request contains a signature in the `X-Webhook-Signature` header, which is a HMAC SHA-256 hash of the payment address and amount using your webhook secret.

### Signature Verification

The braidpay-components package handles signature verification automatically when you use the `processBraidPayWebhook` function:

```typescript
import { processBraidPayWebhook } from 'braidpay-components';

// In your webhook API route
export async function POST(req: Request) {
  const signature = req.headers.get('x-webhook-signature');
  const payload = await req.json();
  
  const result = await processBraidPayWebhook(
    payload,
    signature,
    {
      webhookSecret: process.env.BRAIDPAY_WEBHOOK_SECRET,
      onCompleted: async (paymentData) => {
        // Handle completed payment
        console.log('Payment completed:', paymentData);
      }
    }
  );

  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  return new Response(JSON.stringify({ received: true }), { 
    status: 200, 
    headers: { 'Content-Type': 'application/json' } 
  });
}
```

### Understanding the Signature

The signature is generated using:
- Your webhook secret (from BraidPay dashboard)
- The payment destination address (`toAddress`)
- The payment amount (`amount`)

It is critical to verify the signature to ensure the request came from BraidPay and wasn't tampered with.

### Manual Verification

If you need to manually verify signatures, you can use the `verifyWebhookSignature` function:

```typescript
import { verifyWebhookSignature } from 'braidpay-components';

const isValid = verifyWebhookSignature(
  process.env.BRAIDPAY_WEBHOOK_SECRET,
  payload.toAddress,
  payload.amount,
  signature
);

if (!isValid) {
  // Handle invalid signature...
}
```

### Webhook Retry Policy

BraidPay will retry webhook delivery if your endpoint fails to respond with a 2xx status code or times out (10 seconds). The retry schedule is:
- 1st retry: 1 minute after initial failure
- 2nd retry: 5 minutes after previous attempt
- 3rd retry: 15 minutes after previous attempt
- 4th retry: 30 minutes after previous attempt
- 5th retry: 1 hour after previous attempt

After 5 failed attempts, the webhook will be marked as failed with no further retries.

### Best Practices for Webhook Handling

1. **Always verify signatures** - Use the provided verification functions
2. **Respond quickly** - Return a 200 status code as soon as possible
3. **Process asynchronously** - Handle the webhook data after responding
4. **Implement idempotency** - Use `paymentID` to prevent duplicate processing
5. **Store webhook secret securely** - Never expose it in client-side code
6. **Use environment variables** - Store the webhook secret in `.env.local`
7. **Monitor webhook deliveries** - Check the BraidPay dashboard for delivery status

## Server vs. Client Components

When using BraidPay components with Next.js App Router, it's important to understand which parts of the package should be used in server components versus client components:

### Server-Side Usage (Server Components)

The webhook processing and signature verification should be used in server contexts only:

```tsx
// app/api/webhooks/braidpay/route.ts
import { processBraidPayWebhook } from 'braidpay-components';

export async function POST(req: Request) {
  const signature = req.headers.get('x-webhook-signature');
  const payload = await req.json();
  
  const result = await processBraidPayWebhook(
    payload,
    signature,
    {
      webhookSecret: process.env.BRAIDPAY_WEBHOOK_SECRET,
      onCompleted: async (paymentData) => {
        // Server-side payment processing
        await updateDatabase(paymentData);
      }
    }
  );
  
  return new Response(JSON.stringify({ success: result.success }), {
    status: result.success ? 200 : 400,
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### Client-Side Usage (Client Components)

UI components and payment handling should be used in client components:

```tsx
"use client"
import { PaymentForm, BraidPayButton } from 'braidpay-components';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      
      <PaymentForm
        paymentLinkID="your-payment-link-id"
        paymentLink="https://app.braidpay.com/p/your-payment-link"
        productName="Premium Subscription"
        price={99}
        onPaymentComplete={(status) => {
          console.log('Payment completed:', status);
        }}
      />
    </div>
  );
}
```

### API Route for Payment Verification

Create an API route for handling client-side payment verification:

```typescript
// app/api/check-payment-status/route.ts
import { verifyPaymentStatus } from '@/lib/payments';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, paymentLinkID } = await req.json();
  
  if (!email || !paymentLinkID) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields' },
      { status: 400 }
    );
  }
  
  try {
    // Check your database or payment service
    const paymentStatus = await verifyPaymentStatus(email, paymentLinkID);
    
    return NextResponse.json(paymentStatus);
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
```

By separating server and client code clearly, you'll avoid the "Dynamic require of 'buffer'" and "Can't find variable: global" errors that can occur when Node.js-specific code runs in the browser.

## Best Practices

### Modular Usage

BraidPay components are designed to be modular and composable. Here are some best practices for using them effectively:

#### 1. Component-Based Architecture

Instead of building large monolithic payment pages, compose smaller specialized components:

```tsx
// PaymentPage.tsx
import { useState } from 'react';
import { PaymentHeader } from './PaymentHeader';
import { PaymentSummary } from './PaymentSummary';
import { PaymentForm } from 'braidpay-components';
import { PaymentSuccess } from './PaymentSuccess';

export function PaymentPage() {
  const [isCompleted, setIsCompleted] = useState(false);
  
  return (
    <div className="payment-container">
      <PaymentHeader />
      <PaymentSummary product="Premium Plan" price={99} />
      
      {!isCompleted ? (
        <PaymentForm
          paymentLinkID="your-payment-link-id"
          paymentLink="https://app.braidpay.com/p/your-link"
          productName="Premium Plan"
          price={99}
          onPaymentComplete={() => setIsCompleted(true)}
        />
      ) : (
        <PaymentSuccess />
      )}
    </div>
  );
}
```

#### 2. Separation of Concerns

Separate UI components from payment logic:

```tsx
// hooks/usePayment.ts
import { useState } from 'react';
import { usePaymentVerification } from 'braidpay-components';

export function usePayment(paymentLinkID: string) {
  const [userEmail, setUserEmail] = useState('');
  
  const { status, registerPayment, isPolling } = usePaymentVerification({
    paymentLinkID,
    onPaymentComplete: (data) => {
      // Custom payment completion logic
      saveToDatabase(data);
    }
  });
  
  return {
    status,
    isPolling,
    userEmail,
    setUserEmail,
    startPayment: () => registerPayment(userEmail),
  };
}
```

#### 3. Progressive Enhancement

Start with basic payment functionality and progressively enhance with additional features:

1. **Basic Implementation**: Simple payment form
2. **Add Verification**: Email verification and status updates
3. **Add Webhooks**: Server-side payment confirmation
4. **Add User Experience**: Loading states, error handling, success screens

#### 4. Server/Client Separation

For optimal performance and security:

- Use the webhook handling functions on the server
- Use UI components on the client
- Pass data between them using API routes

```tsx
// Server component or API route
import { processBraidPayWebhook } from 'braidpay-components';

// Client component
import { PaymentForm } from 'braidpay-components';
```

#### 5. Error Handling

Always implement proper error handling for payment operations:

```tsx
try {
  await registerPayment(email);
} catch (error) {
  // Handle specific error cases
  if (error.message.includes('rate limit')) {
    showRateLimitMessage();
  } else if (error.message.includes('validation')) {
    showValidationError();
  } else {
    // Generic error handling
    showGenericError();
  }
}
```

By following these best practices, you'll create a more maintainable, scalable, and robust payment implementation.

---

Created with ❤️. 