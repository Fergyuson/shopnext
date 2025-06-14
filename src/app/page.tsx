// src/app/page.tsx
import React from 'react';
import { CountryList } from '@/features/productList/ui/CountryList';

export default function Home() {
  return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">ShopNext</h1>
        <CountryList />
      </main>
  );
}
