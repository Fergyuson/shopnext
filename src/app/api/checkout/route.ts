// src/app/api/checkout/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-05-28.basil', // ставим ту версию, что в типах
});

export async function POST(request: Request) {
    const { items } = await request.json();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: { metadata: { code: item.code } },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${request.headers.get('origin')}/success`,
        cancel_url: `${request.headers.get('origin')}/cancel`,
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
