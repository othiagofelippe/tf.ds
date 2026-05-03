interface ComponentCard {
  id: string
  name: string
  description: string
  status: "stable" | "experimental"
}

const COMPONENTS: ComponentCard[] = [
  {
    id: "button",
    name: "Button",
    description: "Triggers actions and events.",
    status: "experimental",
  },
]

interface HomeProps {
  onSelect: (id: string) => void
}

export function Home({ onSelect }: HomeProps): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-text-primary text-2xl font-semibold">Components</h2>
        <p className="text-text-secondary mt-1 text-sm">
          Select a component to explore its variants and states.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {COMPONENTS.map((component) => (
          <button
            key={component.id}
            onClick={() => onSelect(component.id)}
            className="border-border-subtle bg-bg-default hover:border-border-strong hover:bg-bg-subtle group flex cursor-pointer flex-col gap-3 rounded-lg border p-5 text-left transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-text-primary font-medium">{component.name}</span>
              <span
                className={[
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                  component.status === "stable"
                    ? "bg-feedback-success/10 text-feedback-success"
                    : "bg-feedback-warning/10 text-feedback-warning",
                ].join(" ")}
              >
                {component.status}
              </span>
            </div>
            <p className="text-text-secondary text-sm">{component.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
