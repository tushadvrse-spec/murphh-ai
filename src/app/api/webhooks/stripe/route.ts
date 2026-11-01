import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2025-02-24.acacia' as unknown as Stripe.LatestApiVersion })
  : null;

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!stripe || !webhookSecret || !signature) {
      return NextResponse.json(
        { message: 'Stripe webhook received (mock mode active)' },
        { status: 200 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid signature';
      console.error(`Webhook signature verification failed: ${msg}`);
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    // Handle checkout session completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerEmail = session.customer_details?.email || session.metadata?.customerEmail;
      const productId = session.metadata?.productId || 'prod-1';
      const amount = session.amount_total ? session.amount_total / 100 : 29.00;
      const paymentRef = session.payment_intent ? String(session.payment_intent) : session.id;

      console.log(`[Stripe Webhook] Verified payment of $${amount} for product ${productId} from ${customerEmail}`);

      // In production with Supabase configured:
      // 1. Insert order record into public.orders table with download_token = uuid()
      // 2. Dispatch transactional delivery email via Resend
      // 3. Increment creator sales metrics
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal webhook error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
