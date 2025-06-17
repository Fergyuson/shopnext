// src/shared/ui/Button/Button.tsx
'use client';

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Простая обёртка над <button>, с Tailwind-стилями:
 * - синий фон
 * - белый текст
 * - скруглённые углы
 */
export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
    <button
        className={`cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white ${className}`}
        {...props}
    >
        {children}
    </button>
);
