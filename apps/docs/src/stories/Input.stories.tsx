import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "@tfds/react"

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Campo de entrada de texto do tf.ds. Renderiza um <input> nativo com três tamanhos, status de validação e foco visível nos três temas.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do campo",
      table: { defaultValue: { summary: "md" } },
    },
    status: {
      control: "select",
      options: ["default", "error", "success"],
      description: "Status de validação",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o campo",
      table: { defaultValue: { summary: "false" } },
    },
    placeholder: {
      control: "text",
      description: "Texto de placeholder",
    },
  },
  args: {
    "aria-label": "Campo de exemplo",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Digite algo",
  },
}

export const AllSizes: Story = {
  name: "All Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <Input aria-label="Small" size="sm" placeholder="Small" />
      <Input aria-label="Medium" size="md" placeholder="Medium" />
      <Input aria-label="Large" size="lg" placeholder="Large" />
    </div>
  ),
}

export const AllStatuses: Story = {
  name: "All Statuses",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <Input aria-label="Default" status="default" placeholder="Default" />
      <Input aria-label="Error" status="error" placeholder="Error" />
      <Input aria-label="Success" status="success" placeholder="Success" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
}
