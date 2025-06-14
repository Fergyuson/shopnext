// src/features/productList/ui/CountryList.tsx
'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '@/entities/product/api/productApi';
import { CountryCard } from '@/entities/product/ui/CountryCard';
import type { ICountry } from '@/entities/product/types';

// 1. Определяем пропсы, включая filter
interface CountryListProps {
    filter: string;
}

// 2. Деструктурируем filter из пропсов
export const CountryList: React.FC<CountryListProps> = ({ filter }) => {
    const { data, loading, error } = useQuery<{ countries: ICountry[] }>(GET_COUNTRIES);

    if (loading) return <div>Загрузка…</div>;
    if (error)   return <div className="text-red-600">Ошибка: {error.message}</div>;

    // 3. Теперь filter доступен и мы можем отфильтровать данные
    const filteredCountries = data!.countries.filter((c) =>
        c.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((c) => (
                <CountryCard key={c.code} country={c} />
            ))}
        </div>
    );
};
