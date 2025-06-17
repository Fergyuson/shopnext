import React from 'react';
import CountryDetailClient from './CountryDetailClient';

export default function CountryPage({
                                        params,
                                    }: {
    params: { code: string };
}) {
    return <CountryDetailClient code={params.code} />;
}