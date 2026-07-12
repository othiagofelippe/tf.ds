import type { Meta, StoryObj } from "@storybook/react"
import { Typography } from "@tfds/react"

const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Componente tipográfico do tf.ds. Renderiza o elemento semântico via prop `as` e aplica a escala de variantes (display, heading, body, label, caption, code, overline), cor, alinhamento e truncamento.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "p", "span", "blockquote", "code", "pre"],
      description: "Elemento HTML semântico renderizado",
      table: { defaultValue: { summary: "p" } },
    },
    variant: {
      control: "select",
      options: [
        "display-lg",
        "display-md",
        "display-sm",
        "heading-xl",
        "heading-lg",
        "heading-md",
        "heading-sm",
        "body-lg",
        "body-md",
        "body-sm",
        "label-lg",
        "label-md",
        "label-sm",
        "caption",
        "code",
        "overline",
      ],
      description: "Estilo tipográfico aplicado",
      table: { defaultValue: { summary: "body-md" } },
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "disabled", "onBrand", "error", "success", "warning"],
      description: "Cor do texto a partir dos tokens semânticos",
      table: { defaultValue: { summary: "primary" } },
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "Alinhamento horizontal do texto",
      table: { defaultValue: { summary: "left" } },
    },
    truncate: {
      control: "boolean",
      description: "Trunca o texto em uma linha com reticências",
      table: { defaultValue: { summary: "false" } },
    },
    children: {
      control: "text",
      description: "Conteúdo de texto",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    variant: "body-md",
  },
}

const variants = [
  "display-lg",
  "display-md",
  "display-sm",
  "heading-xl",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "body-lg",
  "body-md",
  "body-sm",
  "label-lg",
  "label-md",
  "label-sm",
  "caption",
  "code",
  "overline",
] as const

export const AllVariants: Story = {
  name: "All Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <Typography key={variant} variant={variant}>
          {variant}
        </Typography>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  name: "Colors",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography color="primary">primary</Typography>
      <Typography color="secondary">secondary</Typography>
      <Typography color="disabled">disabled</Typography>
      <Typography color="error">error</Typography>
      <Typography color="success">success</Typography>
      <Typography color="warning">warning</Typography>
    </div>
  ),
}

export const Alignment: Story = {
  name: "Alignment",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography align="left">Left aligned</Typography>
      <Typography align="center">Center aligned</Typography>
      <Typography align="right">Right aligned</Typography>
      <Typography align="justify">
        Justified text stretches to fill the full width of its container across multiple lines.
      </Typography>
    </div>
  ),
}

export const Truncate: Story = {
  name: "Truncate",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="max-w-xs">
      <Typography truncate>
        This is a very long line of text that will be truncated with an ellipsis when it overflows.
      </Typography>
    </div>
  ),
}

export const SemanticElements: Story = {
  name: "Semantic Elements",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <Typography as="h1" variant="display-md">
        Heading level 1
      </Typography>
      <Typography as="h2" variant="heading-xl">
        Heading level 2
      </Typography>
      <Typography as="p" variant="body-md">
        A paragraph of body text.
      </Typography>
      <Typography as="code" variant="code">
        const value = 42
      </Typography>
    </div>
  ),
}
