'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from '@/entities/product/api/productApi';
import type { ICountry } from '@/entities/product/types';
import { CountryCard } from '@/entities/product/ui/CountryCard';
import { useCart } from '@/app/providers';
import { Button } from '@/shared/ui/Button/Button';

export default function CountryDetailClient({ code }: { code: string }) {
    const { data, loading, error } = useQuery<{ country: ICountry }>(
        GET_COUNTRY,
        { variables: { code } }
    );
    const { addItem } = useCart();

    if (loading) return <div>Загрузка…</div>;
    if (error)   return <div className="text-red-600">Ошибка: {error.message}</div>;
    if (!data?.country) return <div>Страна не найдена</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Детали страны</h1>
            <CountryCard country={data.country} />
            {/* Здесь могли бы быть дополнительные поля: описание, регион и т.д. */}
            <Button onClick={() => addItem(data.country)}>
                        Добавить в корзину
                        </Button>
        </div>
    );
}
