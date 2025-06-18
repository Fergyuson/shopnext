// src/features/productList/ui/CountryDetailClient.tsx
'use client';

import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
    useContext
} from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from '@/entities/product/api/productApi';
import { ICountry } from '@/entities/product/types';
import { useCart } from '@/app/providers';

// ВСЕ хуки — безусловно, в одном порядке
export default function CountryDetailClient({ code }: { code: string }) {
    // 1. Data fetching hook
    const { data, loading, error } = useQuery<{ country: ICountry }>(GET_COUNTRY, {
        variables: { code },
    });

    // 2. Cart context hook
    const { items, addItem, removeItem } = useCart();

    // 3. Local UI state (пример)
    const [isAdding, setIsAdding] = useState(false);

    // 4. Ref/example
    const mountedRef = useRef(false);

    // 5. Memoized value
    const country = useMemo(() => data?.country, [data]);

    // 6. Effect example
    useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true;
            return;
        }
        // какой-то эффект при изменении country
    }, [country]);

    // 7. Callback example
    const handleAdd = useCallback(() => {
        if (country) {
            setIsAdding(true);
            addItem(country);
            setIsAdding(false);
        }
    }, [addItem, country]);

    // ——— После всех хуков уже условный UI ———
    if (loading) return <div>Загрузка детализации...</div>;
    if (error) return <div className="text-red-600">Ошибка: {error.message}</div>;
    if (!country) return <div>Не найдено</div>;

    return (
        <div className="p-6 border rounded-lg shadow">
            <h2 className="text-2xl mb-2">{country.name}</h2>
            <p className="mb-4">{country.emoji}</p>
            <button
                onClick={handleAdd}
                disabled={isAdding}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                {isAdding ? 'Добавление...' : 'Добавить в корзину'}
            </button>
        </div>
    );
}
