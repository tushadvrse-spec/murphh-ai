import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2025-02-24.acacia' as unknown as Stripe.LatestApiVersion })
  : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, title, price, customerEmail, creatorSlug, productSlug } = body;

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (stripe) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: title || 'Digital Product',
              },
              unit_amount: Math.round((price || 29) * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        customer_email: customerEmail || undefined,
        success_url: `${origin}/download/{CHECKOUT_SESSION_ID}?success=true`,
        cancel_url: `${origin}/${creatorSlug}/${productSlug}?canceled=true`,
        metadata: {
          productId: productId || 'prod-1',
          customerEmail: customerEmail || '',
        },
      });

      return NextResponse.json({ url: session.url, sessionId: session.id });
    }

    // Fallback test simulation URL
    const mockToken = 'd8e4f1a2-3b4c-4d5e-9f0a-1b2c3d4e5f60';
    return NextResponse.json({
      url: `${origin}/download/${mockToken}?email=${encodeURIComponent(customerEmail || 'customer@example.com')}`,
      sessionId: `test_cs_${Date.now()}`,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Checkout session error:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
