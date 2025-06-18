'use client';

import React from 'react';

type SearchBarProps = {
    value: string;
    onChangeAction: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeAction }) => (
    <input
        type="text"
        className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Поиск..."
        value={value}
        onChange={(e) => onChangeAction(e.target.value)}
    />
);
