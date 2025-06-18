// src/features/checkout/ui/CheckoutForm.tsx
'use client';

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '@/app/providers';

interface CheckoutFormProps {
    items: any[]; // или точный тип ICountry[]
}

export default function CheckoutForm({ items }: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const { clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            });
            const { sessionId } = await res.json();
            await stripe.redirectToCheckout({ sessionId });
            clearCart();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="border p-4 rounded" />
            {error && <p className="text-red-600">{error}</p>}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="bg-blue-600 px-4 py-2 rounded text-white disabled:opacity-50"
            >
                {loading ? 'Обработка…' : 'Оплатить'}
            </button>
        </form>
    );
}
