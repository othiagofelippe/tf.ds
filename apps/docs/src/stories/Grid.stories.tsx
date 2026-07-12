import type { Meta, StoryObj } from "@storybook/react"
import { Grid } from "@tfds/react"

const meta = {
  title: "Components/Grid",
  component: Grid,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Primitivo de layout que organiza filhos em CSS Grid. Expõe cols (fixo ou responsivo) e gap. Como primitivo de layout (AD-007), aceita className para templates exóticos.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "section", "ul", "ol", "main"],
      description: "Elemento HTML semântico renderizado",
      table: { defaultValue: { summary: "div" } },
    },
    gap: {
      control: "select",
      options: ["0", "1", "2", "3", "4", "6", "8", "12", "16"],
      description: "Espaçamento entre as células (escala Tailwind)",
      table: { defaultValue: { summary: "0" } },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const Cell = ({ label }: { label: string }): JSX.Element => (
  <div className="rounded-md bg-[--tfds-color-bg-subtle] px-4 py-6 text-center text-[--tfds-color-text-primary]">
    {label}
  </div>
)

export const Default: Story = {
  args: { gap: "4" },
  render: (args) => (
    <Grid {...args} cols={3} className="w-[480px]">
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
      <Cell label="5" />
      <Cell label="6" />
    </Grid>
  ),
}

export const FixedColumns: Story = {
  name: "Fixed columns",
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid cols={4} gap="3" className="w-[520px]">
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
    </Grid>
  ),
}

export const Responsive: Story = {
  name: "Responsive columns",
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid cols={{ base: 1, md: 2, lg: 4 }} gap="4" className="w-[520px]">
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
    </Grid>
  ),
}

export const ExoticTemplate: Story = {
  name: "Exotic template via className",
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid className="w-[480px] grid-cols-[1fr_2fr]" gap="4">
      <Cell label="1fr" />
      <Cell label="2fr" />
    </Grid>
  ),
}
