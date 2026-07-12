import type { Meta, StoryObj } from "@storybook/react"
import { VStack } from "@tfds/react"

const meta = {
  title: "Components/VStack",
  component: VStack,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Primitivo de layout que empilha filhos verticalmente com flexbox. Expõe gap, align e justify. Como primitivo de layout (AD-007), aceita className para composição.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "section", "article", "nav", "ul", "ol", "main"],
      description: "Elemento HTML semântico renderizado",
      table: { defaultValue: { summary: "div" } },
    },
    gap: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "6", "8", "12", "16"],
      description: "Espaçamento entre os filhos (escala Tailwind)",
      table: { defaultValue: { summary: "0" } },
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
      description: "Alinhamento no eixo transversal",
      table: { defaultValue: { summary: "stretch" } },
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around"],
      description: "Distribuição no eixo principal",
      table: { defaultValue: { summary: "start" } },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VStack>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ label }: { label: string }): JSX.Element => (
  <div className="rounded-md bg-[--tfds-color-bg-subtle] px-4 py-2 text-[--tfds-color-text-primary]">
    {label}
  </div>
)

export const Default: Story = {
  args: { gap: "4", align: "stretch", justify: "start" },
  render: (args) => (
    <VStack {...args}>
      <Box label="Item 1" />
      <Box label="Item 2" />
      <Box label="Item 3" />
    </VStack>
  ),
}

export const Gaps: Story = {
  name: "Gap scale",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-8">
      <VStack gap="1">
        <Box label="gap 1" />
        <Box label="gap 1" />
      </VStack>
      <VStack gap="4">
        <Box label="gap 4" />
        <Box label="gap 4" />
      </VStack>
      <VStack gap="8">
        <Box label="gap 8" />
        <Box label="gap 8" />
      </VStack>
    </div>
  ),
}

export const Align: Story = {
  name: "Align",
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack gap="2" align="center">
      <Box label="short" />
      <Box label="a longer item" />
      <Box label="x" />
    </VStack>
  ),
}

export const Justify: Story = {
  name: "Justify",
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack gap="2" justify="between" className="h-48">
      <Box label="top" />
      <Box label="bottom" />
    </VStack>
  ),
}

export const SemanticElement: Story = {
  name: "As semantic element",
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack as="ul" gap="2">
      <Box label="li 1" />
      <Box label="li 2" />
    </VStack>
  ),
}
