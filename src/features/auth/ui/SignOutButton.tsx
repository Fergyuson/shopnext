'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/shared/ui/Button/Button';

export const SignOutButton: React.FC = () => (
    <Button onClick={() => signOut()}>Выйти</Button>
);
