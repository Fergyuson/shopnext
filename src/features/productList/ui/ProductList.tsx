// src/features/productList/ui/ProductList.tsx
'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_COUNTRIES } from '@/entities/product/api/productApi';
import { CountryCard } from '@/entities/product/ui/CountryCard';
import { useUrlState } from '@/shared/lib/urlState';

export const ProductList: React.FC = () => {
    const { state } = useUrlState<{ q?: string }>();
    const q = state.q?.trim().toLowerCase() ?? '';

    // Получаем весь список без переменных
    const { data, loading, error } = useQuery<{ countries: any[] }>(GET_COUNTRIES);

    if (loading) return <div>Загрузка…</div>;
    if (error)   return <div className="text-red-600">Ошибка: {error.message}</div>;

    // Фильтруем по name
    const filtered = data!.countries.filter((c) =>
        c.name.toLowerCase().includes(q)
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((country) => (
                <Link key={country.code} href={`/${country.code}`} className="block">
                    <CountryCard country={country} />
                </Link>
            ))}
        </div>
    );
};
