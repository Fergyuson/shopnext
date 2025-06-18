// src/app/cart/page.tsx
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

    // 1. Сгруппировать по коду
    const grouped = items.reduce(
        (acc: Record<string, { country: ICountry; qty: number }>, country) => {
            if (acc[country.code]) {
                acc[country.code].qty += 1;
            } else {
                acc[country.code] = { country, qty: 1 };
            }
            return acc;
        },
        {}
    );

    // 2. Превратить обратно в массив для рендера и для чекаута
    const groupedArray = Object.values(grouped);

    React.useEffect(() => {
        console.log('Grouped cart items:', groupedArray);
    }, [groupedArray]);

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        // 3. Формируем payload с полем `quantity`
        const payloadItems = groupedArray.map(({ country, qty }) => ({
            name: country.name,
            price: country.price ?? 1,  // убедитесь, что price есть
            quantity: qty,
        }));

        console.log('Checkout payload:', payloadItems);

        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: payloadItems }),
        });

        if (!res.ok) {
            const text = await res.text();
            console.error('Checkout error, server replied:', text);
            return;
        }

        const raw = await res.text();
        console.log('Raw response:', raw);
        const { sessionId } = JSON.parse(raw);

        await stripe?.redirectToCheckout({ sessionId });
    };

    if (groupedArray.length === 0) {
        return <div className="p-8">Корзина пуста</div>;
    }

    return (
        <main className="p-8 space-y-6">
            {groupedArray.map(({ country, qty }) => (
                <div
                    key={country.code}
                    className="flex justify-between items-center"
                >
                    <CountryCard country={country} />
                    <span className="text-lg">×{qty}</span>
                    <Button onClick={() => removeItem(country.code)}>
                        Удалить одну
                    </Button>
                </div>
            ))}

            <div className="flex space-x-4">
                <Button onClick={clearCart}>Очистить корзину</Button>
                <Button onClick={handleCheckout}>Оформить заказ</Button>
            </div>
        </main>
    );
}
