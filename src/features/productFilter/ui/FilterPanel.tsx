// src/features/productFilter/ui/FilterPanel.tsx
'use client';
import React from 'react';
import { useUrlState } from '@/shared/lib/urlState';

export function FilterPanel() {
    const { state, setState } = useUrlState<{ sort?: 'NAME_ASC' | 'NAME_DESC'; page?: string }>();

    return (
        <div className="flex gap-4 mb-6">
            <button
                className={`px-3 py-1 rounded ${
                    state.sort === 'NAME_ASC' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setState({ sort: 'NAME_ASC', page: '1' })}
            >
                ↑ A→Z
            </button>
            <button
                className={`px-3 py-1 rounded ${
                    state.sort === 'NAME_DESC' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setState({ sort: 'NAME_DESC', page: '1' })}
            >
                ↓ Z→A
            </button>
            <button
                className={`px-3 py-1 rounded ${
                    !state.sort ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setState({ sort: undefined, page: '1' })}
            >
                По умолчанию
            </button>
        </div>
    );
}
