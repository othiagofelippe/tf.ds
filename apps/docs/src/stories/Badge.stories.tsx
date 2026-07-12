import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "@tfds/react"

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Indicador de status compacto do tf.ds. Renderiza um <span> não interativo com cinco variantes semânticas e dois tamanhos.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
      description: "Cor semântica do badge",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Tamanho do badge",
      table: { defaultValue: { summary: "md" } },
    },
    children: {
      control: "text",
      description: "Conteúdo do badge",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Badge",
  },
}

export const AllVariants: Story = {
  name: "All Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  name: "All Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
}
