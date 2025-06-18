// src/features/productList/ui/CountryDetailClient.tsx
'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from '@/entities/product/api/productApi';
import type { ICountry } from '@/entities/product/types';
import { useCart } from '@/app/providers';
import { Button } from '@/shared/ui/Button/Button';

interface Props {
    code: string;
}

export default function CountryDetailClient({ code }: Props) {
    const { data, loading, error } = useQuery<{ country: ICountry }>(
        GET_COUNTRY,
        { variables: { code } }
    );

    if (loading) return <div className="p-8">Загрузка…</div>;
    if (error)   return <div className="p-8 text-red-600">Ошибка: {error.message}</div>;

    const country = data!.country;
    const { addItem } = useCart();

    return (
        <article className="border rounded-lg p-6 shadow">
            <h2 className="text-2xl font-bold">{country.name}</h2>
            <div className="text-6xl">{country.emoji}</div>
            <Button onClick={() => addItem(country)}>
                Добавить в корзину
            </Button>
        </article>
    );
}
