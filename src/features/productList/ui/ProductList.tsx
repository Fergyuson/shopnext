// src/features/productList/ui/ProductList.tsx
'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_COUNTRIES } from '@/entities/product/api/productApi';
import { CountryCard } from '@/entities/product/ui/CountryCard';
import { useUrlState } from '@/shared/lib/urlState';

export const ProductList: React.FC = () => {
    const { state } = useUrlState<{ q?: string; sort?: 'NAME_ASC' | 'NAME_DESC'; page?: string }>();
    const q = state.q?.toLowerCase() ?? '';
    const sort = state.sort;
    const page = parseInt(state.page ?? '1', 10);
    const PAGE_SIZE = 20;

    const { data, loading, error } = useQuery<{ countries: any[] }>(GET_COUNTRIES);
    if (loading) return <div>Загрузка…</div>;
    if (error) return <div className="text-red-600">Ошибка: {error.message}</div>;
    if (!data) return <div>Нет данных</div>;

    // Привязываем цену
    const enriched = data.countries.map((c) => ({
        code: c.code,
        name: c.name,
        emoji: c.emoji,
        price: Math.floor(Math.random() * 50) + 1,
    }));

    // Фильтрация по поиску
    let list = enriched.filter((c) => c.name.toLowerCase().includes(q));

    // Сортировка
    if (sort === 'NAME_ASC') {
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'NAME_DESC') {
        list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    }

    // Пагинация
    const start = (page - 1) * PAGE_SIZE;
    list = list.slice(start, start + PAGE_SIZE);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((country) => (
                <Link key={country.code} href={`/${country.code}`} className="block">
                    <CountryCard country={country} />
                </Link>
            ))}
        </div>
    );
};
