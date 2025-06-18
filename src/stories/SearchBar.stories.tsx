import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '@/features/productFilter/ui/SearchBar';

const meta: Meta<typeof SearchBar> = {
    title: 'Features/ProductFilter/SearchBar',
    component: SearchBar,
};
export default meta;

export const Default: StoryObj<typeof SearchBar> = {
    args: {
        value: '',
        // функция-логгер для action
        onChangeAction: (value) => console.log('search:', value),
    },
};
