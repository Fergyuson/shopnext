'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '@/entities/product/api/productApi';
import { CountryCard } from '@/entities/product/ui/CountryCard';
import type { ICountry } from '@/entities/product/types';

export const CountryList: React.FC = () => {
    const { data, loading, error } = useQuery<{ countries: ICountry[] }>(GET_COUNTRIES);

    if (loading) return <div>Загрузка…</div>;
    if (error)   return <div className="text-red-600">Ошибка: {error.message}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data!.countries.map((c) => (
                <CountryCard key={c.code} country={c} />
            ))}
        </div>
    );
};
