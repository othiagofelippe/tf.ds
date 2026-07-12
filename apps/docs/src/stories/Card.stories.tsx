import type { Meta, StoryObj } from "@storybook/react"
import { Card } from "@tfds/react"

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de superfície (bg/border/radius/padding) para agrupar conteúdo relacionado. Sem animação — motion fica a cargo do consumidor.",
      },
    },
  },
  argTypes: {
    shadow: {
      control: "select",
      options: ["none", "sm", "md"],
      description: "Elevação visual via box-shadow",
      table: { defaultValue: { summary: "sm" } },
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Espaçamento interno do conteúdo",
      table: { defaultValue: { summary: "md" } },
    },
    children: {
      control: "text",
      description: "Conteúdo do card",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Card content",
    shadow: "sm",
    padding: "md",
  },
  render: (args) => <Card {...args} />,
}

// --- Shadow ---

export const AllShadows: Story = {
  name: "All Shadows",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Card shadow="none">None</Card>
      <Card shadow="sm">Small</Card>
      <Card shadow="md">Medium</Card>
    </div>
  ),
}

// --- Padding ---

export const AllPaddings: Story = {
  name: "All Paddings",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Card padding="none">None</Card>
      <Card padding="sm">Small</Card>
      <Card padding="md">Medium</Card>
      <Card padding="lg">Large</Card>
    </div>
  ),
}
