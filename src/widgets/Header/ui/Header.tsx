// src/widgets/Header/ui/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/app/providers';
import { useSession } from 'next-auth/react';
import { Button } from '@/shared/ui/Button/Button';
import { SignInButton } from '@/features/auth/ui/SignInButton';
import { SignOutButton } from '@/features/auth/ui/SignOutButton';

export function Header() {
    const { items } = useCart();
    const { data: session } = useSession();

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow">
            {/* Убираем <a>, передаём className прямо в Link */}
            <Link href="/" className="text-xl font-bold">
                ShopNext
            </Link>
            <div className="flex items-center space-x-4">
                       {session ? (
                         <>
                               <span>Привет, {session.user?.name}</span>
                               <SignOutButton />
                             </>
                       ) : (
                         <SignInButton />
                       )}

            {/* Здесь всё ок — Button не <a> */}
            <Link href="/cart">
                <Button>Корзина ({items.length})</Button>
            </Link>
            </div>
        </header>
    );
}
