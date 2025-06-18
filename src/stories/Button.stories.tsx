// src/stories/Button.stories.tsx
import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Button } from '../shared/ui/Button/Button';

export default {
    title: 'Shared/Button',
    component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { children: 'Нажми меня' };
