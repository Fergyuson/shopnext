// src/app/checkout/page.tsx
'use client';

import React from 'react';
import { useCart } from '@/app/providers';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/features/checkout/ui/CheckoutForm';

export default function CheckoutPage() {
    const { items } = useCart();

    if (items.length === 0) {
        return <div className="p-8">Корзина пуста</div>;
    }

    // Подставь сюда свой публичный ключ из .env.local
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>

            <Elements stripe={stripePromise}>
                {/* Предположим, CheckoutForm принимает проп items */}
                <CheckoutForm items={items} />
            </Elements>
        </main>
    );
}
