'use client';

import React from 'react';
import { useCart } from '@/app/providers';
import { CountryCard } from '@/entities/product/ui/CountryCard';
import { Button } from '@/shared/ui/Button/Button';
import { loadStripe } from '@stripe/stripe-js';
import type { ICountry } from '@/entities/product/types';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function CartPage() {
    const { items, removeItem, clearCart } = useCart();

    // 1. Группируем массив items в объект { [code]: { country, qty } }
    const grouped = items.reduce<Record<string, { country: ICountry; qty: number }>>(
        (acc, country) => {
            if (acc[country.code]) {
                acc[country.code].qty += 1;
            } else {
                acc[country.code] = { country, qty: 1 };
            }
            return acc;
        },
        {}
    );

    // 2. Преобразуем обратно в массив для .map()
    const groupedArray = Object.values(grouped);

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items }), // оставляем исходный массив, чтобы учитывались все единицы
        });
        const { sessionId } = await res.json();
        await stripe?.redirectToCheckout({ sessionId });
    };

    return (
        <main className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">Ваша корзина</h1>

            {groupedArray.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {groupedArray.map(({ country, qty }) => (
                            <div
                                key={country.code}  // теперь ключ уникален
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <CountryCard country={country} />
                                    <span className="text-lg font-medium">×{qty}</span>
                                </div>
                                <Button onClick={() => removeItem(country.code)}>
                                    Удалить одну
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex space-x-4">
                        <Button onClick={clearCart}>Очистить корзину</Button>
                        <Button onClick={handleCheckout}>Оформить заказ</Button>
                    </div>
                </>
            )}
        </main>
    );
}
