'use client';

import React from 'react';
import { ICountry } from '../types';

type Props = { country: ICountry };

export const CountryCard: React.FC<Props> = ({ country }) => (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col items-center">
        <div className="text-5xl">{country.emoji}</div>
        <h3 className="mt-2 text-lg font-semibold">{country.name}</h3>
        <p className="text-sm text-gray-500">{country.code}</p>
    </div>
);
