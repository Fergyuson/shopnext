'use client';

import { useState, useEffect } from 'react';
import type { ICountry } from '@/entities/product/types';

export function useCart() {
    const [items, setItems] = useState<ICountry[]>([]);

    // Загружаем из localStorage при старте
    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) setItems(JSON.parse(stored));
    }, []);

    // Сохраняем в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (item: ICountry) => setItems((prev) => [...prev, item]);
    const removeItem = (code: string) =>
        setItems((prev) => prev.filter((i) => i.code !== code));
    const clearCart = () => setItems([]);

    return { items, addItem, removeItem, clearCart };
}
