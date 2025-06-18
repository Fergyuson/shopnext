// src/features/productList/ui/Pagination.tsx
'use client';
import React from 'react';
import { useUrlState } from '@/shared/lib/urlState';

interface PaginationProps {
    total: number;
}
const PAGE_SIZE = 20;

export function Pagination({ total }: PaginationProps) {
    const { state, setState } = useUrlState<{ page?: string }>();
    const page = parseInt(state.page ?? '1', 10);
    const pages = Math.ceil(total / PAGE_SIZE);

    return (
        <div className="flex gap-2 mt-6">
            <button disabled={page <= 1} onClick={() => setState({ page: String(page - 1) })}>
                Prev
            </button>
            <span>Page {page} of {pages}</span>
            <button disabled={page >= pages} onClick={() => setState({ page: String(page + 1) })}>
                Next
            </button>
        </div>
    );
}
