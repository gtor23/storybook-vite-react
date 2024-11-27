import { Meta, StoryObj } from  '@storybook/react'
import TestButton from './TestButton'

const meta: Meta<typeof TestButton> = {
    title: 'Templates/Test Button',
    component: TestButton,
    tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof TestButton>;


export const Primary: Story = {
    args: {
        label: 'Clicker'
    }
}