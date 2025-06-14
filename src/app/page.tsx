'use client';

import React from 'react';
import { useFilter } from '@/features/productFilter/model/filterModel';
import { SearchBar } from '@/features/productFilter/ui/SearchBar';
import { CountryList } from '@/features/productList/ui/CountryList';

export default function HomePage() {
    const { filter, setFilter } = useFilter();

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">ShopNext</h1>

            {/* Поисковая строка */}
            <SearchBar value={filter} onChange={setFilter} />

            {/* Отфильтрованный список */}
            <CountryList filter={filter} />
        </main>
    );
}
