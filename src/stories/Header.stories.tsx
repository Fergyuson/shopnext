// src/stories/Header.stories.tsx

import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Header } from '@/widgets/Header/ui/Header';

export default {
    title: 'Widgets/Header',
    component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
    // если у Header есть пропсы, можно их здесь прописать:
    // title: 'ShopNext',
    // logoSrc: '/logo.png',
};
