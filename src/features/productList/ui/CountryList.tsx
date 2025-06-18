'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '@/entities/product/api/productApi';
import { CountryCard } from '@/entities/product/ui/CountryCard';
import type { ICountry } from '@/entities/product/types';
import Link from 'next/link';

interface CountryListProps {
    filter: string;
}

export const CountryList: React.FC<CountryListProps> = ({ filter }) => {
    // useQuery НЕ должен получать undefined
    const { data, loading, error } =
        useQuery<{ countries: ICountry[] }>(GET_COUNTRIES);

    if (loading) return <div>Загрузка…</div>;
    if (error)   return <div className="text-red-600">Ошибка: {error.message}</div>;

    // проверяем, что data есть
    const countries = data?.countries ?? [];
    const filtered = countries.filter((c) =>
        c.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="grid …">
            {filtered.map((c) => (
                       <Link key={c.code} href={`/${c.code}`} className="block">
                             <CountryCard country={c} />
                           </Link>
            ))}
        </div>
    );
};;
