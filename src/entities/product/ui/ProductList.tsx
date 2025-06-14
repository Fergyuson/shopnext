// src/features/productList/ui/ProductList.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@/entities/product/api/productApi';
import { ProductCard } from '@/entities/product/ui/ProductCard';

export const ProductList: React.FC = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div className="text-red-600">Ошибка: {error.message}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.products.map((prod: any) => (
                <ProductCard key={prod.id} product={prod} />
            ))}
        </div>
    );
};
