// Subset of icons endorsed by tf.ds — sourced from real imports across duo, my-portfolio, and tf.ds.
// To add or remove an icon, edit this list and re-run `pnpm --filter @tfds/icons generate`.

export const CURATED_ICONS = [
  // Navigation / Controls
  "ArrowLeft",
  "ArrowRight",
  "ChevronDown",
  "ChevronLeft",
  "ChevronRight",
  "ChevronUp",
  "X",

  // Actions
  "Check",
  "CheckCheck",
  "Copy",
  "Minus",
  "Pencil",
  "Plus",
  "RefreshCw",
  "Search",
  "SearchX",
  "Send",
  "Share2",
  "Trash2",

  // Status / Feedback
  "AlertCircle",
  "CheckCircle",
  "CheckCircle2",
  "Circle",
  "Loader2",
  "Sparkles",
  "XCircle",

  // Visibility
  "Eye",
  "EyeOff",

  // UI Elements
  "Bookmark",
  "CheckSquare",
  "GripVertical",
  "LayoutDashboard",
  "List",
  "Tag",

  // Finance
  "Banknote",
  "PiggyBank",
  "Receipt",
  "TrendingDown",
  "TrendingUp",
  "Wallet",

  // Domain
  "Building2",
  "CalendarDays",
  "Coffee",
  "Compass",
  "Film",
  "Lightbulb",
  "Play",
  "Star",
  "Tv",
  "UserPlus",

  // Theme / Media
  "ExternalLink",
  "Moon",
  "Sun",
  "Waves",
] as const

export type CuratedIconName = (typeof CURATED_ICONS)[number]
