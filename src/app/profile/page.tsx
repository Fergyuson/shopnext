'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
    const { data: session, status } = useSession({ required: true });

    if (status === 'loading') return <div>Загрузка профиля…</div>;

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-4">Профиль</h1>
            <p>Имя: {session.user?.name}</p>
            <p>Email: {session.user?.email}</p>
            {/* Здесь можно добавить историю заказов и т.д. */}
        </main>
    );
}
