// src/entities/product/ui/CountryCard.tsx
import React from 'react';
import type { ICountry } from '../types';

interface Props {
    country: ICountry;
}

export function CountryCard({ country }: Props) {
    return (
        <article className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="text-2xl font-bold">{country.code}</div>
            <h3 className="mt-1 text-lg font-semibold">{country.name}</h3>
            <p className="mt-2 text-gray-600">{country.emoji}</p>
        </article>
    );
}
