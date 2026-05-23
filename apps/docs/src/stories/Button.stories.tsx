import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@tfds/components"

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de ação primária do tf.ds. Suporta 6 variantes, 4 tamanhos e estados de loading e disabled. Segue WCAG AA nos três temas.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive", "link"],
      description: "Variante visual do botão",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
      description: "Tamanho do botão",
      table: { defaultValue: { summary: "md" } },
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o botão",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      description: "Estado de carregamento — desabilita e aplica aria-busy",
      table: { defaultValue: { summary: "false" } },
    },
    loadingLabel: {
      control: "text",
      description: "Label para screen readers no estado loading",
      table: { defaultValue: { summary: "Loading..." } },
    },
    children: {
      control: "text",
      description: "Conteúdo do botão",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    loadingLabel: "Loading...",
  },
}

const VARIANTS = ["primary", "outline", "ghost", "destructive"] as const
const SIZES = ["sm", "md", "lg"] as const

type OverviewVariant = (typeof VARIANTS)[number]
type OverviewSize = (typeof SIZES)[number]

export const Overview: Story = {
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
  render: () => (
    <div className="inline-grid grid-cols-[auto_repeat(3,auto)] items-center gap-4">
      <div />
      {SIZES.map((size) => (
        <span
          key={size}
          className="text-center text-xs font-medium uppercase tracking-wide opacity-50"
        >
          {size}
        </span>
      ))}

      {VARIANTS.map((variant: OverviewVariant) => (
        <React.Fragment key={variant}>
          <span className="pr-2 text-xs font-medium capitalize opacity-50">{variant}</span>
          {SIZES.map((size: OverviewSize) => (
            <Button key={`${variant}-${size}`} variant={variant} size={size}>
              Button
            </Button>
          ))}
        </React.Fragment>
      ))}
    </div>
  ),
}
