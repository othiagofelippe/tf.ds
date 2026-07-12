import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "@tfds/react"

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Rótulo de campo de formulário do tf.ds. Renderiza um <label> semântico, associável a um controle via `htmlFor`, com três tamanhos e estado disabled.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do rótulo",
      table: { defaultValue: { summary: "md" } },
    },
    disabled: {
      control: "boolean",
      description: "Aparência desabilitada",
      table: { defaultValue: { summary: "false" } },
    },
    children: {
      control: "text",
      description: "Texto do rótulo",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Email",
  },
}

export const AllSizes: Story = {
  name: "All Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
      <Label size="lg">Large label</Label>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: "Disabled label",
    disabled: true,
  },
}

export const AssociatedWithInput: Story = {
  name: "Associated With Input",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email-field">Email</Label>
      <input
        id="email-field"
        type="email"
        placeholder="you@example.com"
        className="h-10 rounded-md border px-3"
      />
    </div>
  ),
}
