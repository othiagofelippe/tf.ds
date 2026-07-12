import { Button } from "@tfds/react"
import { Loader2, Trash2, ExternalLink } from "lucide-react"

const VARIANTS = ["primary", "secondary", "outline", "ghost", "destructive", "link"] as const

const SIZES = ["sm", "md", "lg"] as const

export function ButtonPage(): React.JSX.Element {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-text-primary text-2xl font-semibold">Button</h2>
          <span className="bg-feedback-warning/10 text-feedback-warning rounded-full px-2 py-0.5 text-xs font-medium">
            experimental
          </span>
        </div>
        <p className="text-text-secondary mt-1 text-sm">Triggers actions and events.</p>
      </div>

      <Section title="Variants">
        <Row>
          {VARIANTS.map((v) => (
            <Button key={v} variant={v}>
              {capitalize(v)}
            </Button>
          ))}
        </Row>
      </Section>

      <Section title="Sizes">
        <Row align="end">
          {SIZES.map((s) => (
            <Button key={s} size={s}>
              Size {s.toUpperCase()}
            </Button>
          ))}
        </Row>
      </Section>

      <Section title="States">
        <Row>
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button loading loadingLabel="Saving...">
            Custom label
          </Button>
        </Row>
      </Section>

      <Section title="With Icons">
        <Row>
          <Button>
            <Loader2 size={16} />
            With icon
          </Button>
          <Button variant="destructive">
            <Trash2 size={16} />
            Delete
          </Button>
          <Button variant="outline">
            <ExternalLink size={16} />
            Open
          </Button>
          <Button size="icon" aria-label="Delete">
            <Trash2 size={16} />
          </Button>
        </Row>
      </Section>

      <Section title="All Variants × Sizes">
        <div className="space-y-3">
          {VARIANTS.map((v) => (
            <Row key={v} align="end">
              {SIZES.map((s) => (
                <Button key={s} variant={v} size={s}>
                  {capitalize(v)}
                </Button>
              ))}
            </Row>
          ))}
        </div>
      </Section>
    </div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps): React.JSX.Element {
  return (
    <section className="space-y-4">
      <h3 className="text-text-tertiary text-xs font-medium uppercase tracking-widest">{title}</h3>
      <div className="border-border-subtle bg-bg-default rounded-lg border p-6">{children}</div>
    </section>
  )
}

interface RowProps {
  children: React.ReactNode
  align?: "center" | "end"
}

function Row({ children, align = "center" }: RowProps): React.JSX.Element {
  return (
    <div
      className={["flex flex-wrap gap-3", align === "end" ? "items-end" : "items-center"].join(" ")}
    >
      {children}
    </div>
  )
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
