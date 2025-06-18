// src/app/[code]/page.tsx

import React from 'react';
import CountryDetailClient from '@/features/productList/ui/CountryDetailClient';

interface Props {
    params: Promise<{ code: string }>;
}

export default async function CountryPage({ params }: Props) {
    // распаковали promise
    const { code } = await params;
    return (
        <main className="p-8">
            <CountryDetailClient code={code} />
        </main>
    );
}
