// src/stories/HomePage.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import HomePage from '@/app/page';

const meta: Meta<typeof HomePage> = {
    title: 'Pages/HomePage',
    component: HomePage,
};
export default meta;

type Story = StoryObj<typeof HomePage>;

export const Default: Story = {
    args: {
        // никаких пропсов у страницы нет
    },
};
