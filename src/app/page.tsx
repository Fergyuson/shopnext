'use client';
import React from 'react';
import { SearchBar }   from '@/features/productFilter/ui/SearchBar';
import { FilterPanel } from '@/features/productFilter/ui/FilterPanel';
import { ProductList } from '@/features/productList/ui/ProductList';
import { Pagination }  from '@/features/productList/ui/Pagination';
import { useUrlState } from '@/shared/lib/urlState';
import { useQuery }    from '@apollo/client';
import { GET_COUNTRIES } from '@/entities/product/api/productApi';

export default function HomePage() {
    // расширили generic, чтобы setState({ q, page }) не ругался
    const { state, setState } = useUrlState<{
        q?: string;
        page?: string;
    }>();

    const q = state.q ?? '';
    const page = state.page ?? '1';

    // тот же запрос, что и в ProductList, чтобы знать total
    const { data, loading, error } = useQuery(GET_COUNTRIES, {
        variables: {
            filter: q ? { name_contains: q } : undefined,
            orderBy: 'NAME_ASC',
            offset: (parseInt(page, 10) - 1) * 20,
            limit: 20,
        },
    });

    if (loading) return <div>Загрузка…</div>;
    if (error)   return <div className="text-red-600">Ошибка: {error.message}</div>;

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">ShopNext</h1>

            {/* 1) Сначала поиск — передаём onChange, а не onChangeAction */}
            <SearchBar
                value={q}
                onChangeAction={(val: string) => setState({ q: val, page: '1' })}
            />

            {/* 2) Панель сортировки/сброса */}
            <FilterPanel />

            {/* 3) Список */}
            <ProductList />

            {/* 4) Пагинация — теперь без пустых скобок */}
            <Pagination total={data.countriesCount ?? 0} />
        </main>
    );
}
