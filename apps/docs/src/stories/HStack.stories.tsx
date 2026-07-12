import type { Meta, StoryObj } from "@storybook/react"
import { HStack } from "@tfds/react"

const meta = {
  title: "Components/HStack",
  component: HStack,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Primitivo de layout que alinha filhos horizontalmente com flexbox. Expõe gap, align, justify e wrap. Como primitivo de layout (AD-007), aceita className para composição.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "section", "article", "nav", "ul", "ol", "header"],
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
    wrap: {
      control: "boolean",
      description: "Permite quebra de linha dos filhos (flex-wrap)",
      table: { defaultValue: { summary: "false" } },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HStack>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ label }: { label: string }): JSX.Element => (
  <div className="rounded-md bg-[--tfds-color-bg-subtle] px-4 py-2 text-[--tfds-color-text-primary]">
    {label}
  </div>
)

export const Default: Story = {
  args: { gap: "4", align: "center", justify: "start", wrap: false },
  render: (args) => (
    <HStack {...args}>
      <Box label="Item 1" />
      <Box label="Item 2" />
      <Box label="Item 3" />
    </HStack>
  ),
}

export const Gaps: Story = {
  name: "Gap scale",
  parameters: { controls: { disable: true } },
  render: () => <VStackGroup />,
}

function VStackGroup(): JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      <HStack gap="1">
        <Box label="gap 1" />
        <Box label="gap 1" />
      </HStack>
      <HStack gap="4">
        <Box label="gap 4" />
        <Box label="gap 4" />
      </HStack>
      <HStack gap="8">
        <Box label="gap 8" />
        <Box label="gap 8" />
      </HStack>
    </div>
  )
}

export const Justify: Story = {
  name: "Justify",
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="2" justify="between" className="w-96">
      <Box label="left" />
      <Box label="right" />
    </HStack>
  ),
}

export const Wrap: Story = {
  name: "Wrap",
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="2" wrap className="w-64">
      <Box label="Item 1" />
      <Box label="Item 2" />
      <Box label="Item 3" />
      <Box label="Item 4" />
      <Box label="Item 5" />
    </HStack>
  ),
}

export const SemanticElement: Story = {
  name: "As semantic element",
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack as="nav" gap="4">
      <Box label="Home" />
      <Box label="Sobre" />
      <Box label="Contato" />
    </HStack>
  ),
}
