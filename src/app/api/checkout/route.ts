import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});

export async function POST(req: Request) {
    const { items } = await req.json(); // items: ICountry[]

    const line_items = items.map((item: any) => ({
        price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: 100, // демонстрационная цена $1.00
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/success`,
        cancel_url: `${req.headers.get('origin')}/cart`,
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
