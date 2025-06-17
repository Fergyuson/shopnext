'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/shared/ui/Button/Button';

export const SignInButton: React.FC = () => (
    <Button onClick={() => signIn('github')}>Войти с GitHub</Button>
);
