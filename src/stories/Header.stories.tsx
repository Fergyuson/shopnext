// src/stories/Header.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/widgets/Header/ui/Header';

const meta: Meta<typeof Header> = {
    title: 'Widgets/Header',
    component: Header,
};

export default meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Default: StoryObj<typeof Header> = {
    args: {
        // если у Header есть пропсы, можно их здесь заполнить, например:
        // title: 'ShopNext',
        // logoSrc: '/logo.png',
    },
};
