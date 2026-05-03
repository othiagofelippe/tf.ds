import { useState } from "react"
import { Sun, Moon, Waves, ChevronRight } from "lucide-react"
import { Home } from "./pages/Home"
import { ButtonPage } from "./pages/ButtonPage"

type Theme = "light" | "dark" | "ocean"
type Page = "home" | "button"

const PAGES: Record<Exclude<Page, "home">, React.FC> = {
  button: ButtonPage,
}

const PAGE_LABELS: Record<Exclude<Page, "home">, string> = {
  button: "Button",
}

const THEMES: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "Light", icon: <Sun size={14} /> },
  { value: "dark", label: "Dark", icon: <Moon size={14} /> },
  { value: "ocean", label: "Ocean", icon: <Waves size={14} /> },
]

export function App(): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>("light")
  const [page, setPage] = useState<Page>("home")

  const themeClass = theme === "light" ? "" : theme
  const CurrentPage = page !== "home" ? PAGES[page] : null

  return (
    <div className={themeClass}>
      <div className="bg-bg-page text-text-primary min-h-screen font-sans">
        <header className="border-border-default flex items-center justify-between border-b px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setPage("home")}
              className="text-text-primary hover:text-action-primary cursor-pointer font-semibold transition-colors"
            >
              tf.ds
            </button>
            {page !== "home" && (
              <>
                <ChevronRight size={14} className="text-text-tertiary" />
                <span className="text-text-secondary">{PAGE_LABELS[page]}</span>
              </>
            )}
          </div>

          <div className="border-border-subtle bg-bg-subtle flex items-center gap-1 rounded-lg border p-1">
            {THEMES.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={[
                  "flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  theme === t.value
                    ? "bg-surface-raised text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary",
                ].join(" ")}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-8 py-10">
          {CurrentPage ? <CurrentPage /> : <Home onSelect={(id) => setPage(id as Page)} />}
        </main>
      </div>
    </div>
  )
}
