// src/stories/CheckoutForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import CheckoutForm from '@/features/checkout/ui/CheckoutForm';

const meta: Meta<typeof CheckoutForm> = { /*…*/ };
export default meta;

export const Default: StoryObj<typeof CheckoutForm> = {
    args: {
        items: [{ code: 'US', name: 'United States', emoji: '🇺🇸', price: 10, quantity: 2 }],
    },
};
