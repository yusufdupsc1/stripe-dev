import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

function cors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, ...data } = req.body ?? {};

  try {
    switch (action) {
      /* ── Create a PaymentIntent (for custom Stripe Elements UI) ── */
      case 'create-payment-intent': {
        if (!data.amount || typeof data.amount !== 'number') {
          return res.status(400).json({ error: 'amount is required and must be a number (in cents)' });
        }
        const pi = await stripe.paymentIntents.create({
          amount: data.amount,
          currency: (data.currency as string) || 'usd',
          description: data.description || 'Portfolio contact / hire payment',
          automatic_payment_methods: { enabled: true },
          metadata: { source: 'portfolio', ...(data.metadata || {}) },
        });
        return res.status(200).json({ client_secret: pi.client_secret, id: pi.id });
      }

      /* ── Stripe Checkout Session (hosted page) ── */
      case 'create-checkout-session': {
        if (!data.amount || !data.productName) {
          return res.status(400).json({ error: 'amount and productName are required' });
        }
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          line_items: [{
            price_data: {
              currency: (data.currency as string) || 'usd',
              product_data: { 
                name: data.productName, 
                description: data.description || 'Portfolio service payment' 
              },
              unit_amount: data.amount,
            },
            quantity: data.quantity || 1,
          }],
          success_url: `${appUrl}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url:  `${appUrl}/?payment=cancelled`,
          metadata: { source: 'portfolio' },
        });
        return res.status(200).json({ url: session.url, id: session.id });
      }

      /* ── Create or look-up a Customer ── */
      case 'create-customer': {
        if (!data.email) return res.status(400).json({ error: 'email is required' });
        const existing = await stripe.customers.list({ email: data.email, limit: 1 });
        const customer = existing.data.length
          ? existing.data[0]
          : await stripe.customers.create({ email: data.email, name: data.name || '' });
        return res.status(200).json({ id: customer.id, email: customer.email });
      }

      /* ── Refund a PaymentIntent ── */
      case 'create-refund': {
        if (!data.paymentIntentId) return res.status(400).json({ error: 'paymentIntentId is required' });
        const refund = await stripe.refunds.create({ payment_intent: data.paymentIntentId });
        return res.status(200).json({ id: refund.id, status: refund.status });
      }

      /* ── Retrieve a Session (for post-checkout confirmation) ── */
      case 'retrieve-session': {
        if (!data.sessionId) return res.status(400).json({ error: 'sessionId is required' });
        const session = await stripe.checkout.sessions.retrieve(data.sessionId);
        return res.status(200).json({ status: session.payment_status, customer_email: session.customer_details?.email });
      }

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    const statusCode = (err as { statusCode?: number }).statusCode || 500;
    return res.status(statusCode).json({ error: message });
  }
}
