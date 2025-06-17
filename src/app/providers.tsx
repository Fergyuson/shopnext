// src/app/providers.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/shared/lib/apolloClient';
import { SessionProvider } from 'next-auth/react';
import { useCart as useCartModel } from '@/features/cart/model/cartModel';

// 1. Описываем тип, который возвращает наш базовый hook useCartModel()
type CartContextType = ReturnType<typeof useCartModel>;

// 2. Создаём контекст
const CartContext = createContext<CartContextType | null>(null);

// 3. Провайдер, который инициализирует стейт один раз и передаёт всем детям
export function CartProvider({ children }: { children: React.ReactNode }) {
    const cart = useCartModel();
    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

// 4. Новый useCart, берёт контекст
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error('useCart must be used within CartProvider');
    }
    return ctx;
}

// 5. Основные провайдеры приложения
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
                  <ApolloProvider client={client}>
                    <CartProvider>{children}</CartProvider>
                  </ApolloProvider>
                </SessionProvider>
    );
}
