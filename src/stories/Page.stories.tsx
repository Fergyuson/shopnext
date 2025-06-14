// src/stories/Page.stories.tsx

import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import HomePage from '@/app/page';

export default {
    title: 'Pages/HomePage',
    component: HomePage,
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = (args) => <HomePage {...args} />;

export const Default = Template.bind({});
Default.args = {
    // страница без входных пропсов
};
