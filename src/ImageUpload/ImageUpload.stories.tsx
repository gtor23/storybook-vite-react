import { Meta, StoryObj } from  '@storybook/react'
import ImageUpload from './ImageUpload'

const meta: Meta<typeof ImageUpload> = {
    title: 'Templates/Image Upload',
    component: ImageUpload,
    tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof ImageUpload>;

export const Primary: Story = {
    render: () => {
        return (
            <ImageUpload />
        )
    }
}