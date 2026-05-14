---
name: Widget Settings Page
description: Widget settings page built in /widget — structure, API, and component breakdown
type: project
---

Widget settings page at `/widget` allows configuring an embedded AI chat widget.

**Why:** Business owners need to brand and position a chat widget on their websites.

**How to apply:** When modifying widget-related features, all files live under `src/components/ui/widget/` and `src/lib/widget/`.

**API:** `/api/v1/widget` — GET (returns null on 404), POST create, PUT update, DELETE.

**Body:** `{ primary_color, secondary_color, position, logo_url, welcome_message }` where position is `top_left | top_right | bottom_left | bottom_right`.

**File structure:**
- `src/lib/types/widget.ts` — Widget & WidgetPayload types
- `src/lib/widget/widget-service.ts` — server-only API calls
- `src/lib/widget/actions.ts` — createWidgetAction, updateWidgetAction, deleteWidgetAction
- `src/components/ui/widget/context.tsx` — WidgetProvider + useWidget hook (holds draft state)
- `src/components/ui/widget/color-picker.tsx` — reusable color picker with 16 presets
- `src/components/ui/widget/position-selector.tsx` — 4-button position grid
- `src/components/ui/widget/logo-uploader.tsx` — URL tab + file upload tab
- `src/components/ui/widget/branding-card.tsx` — logo + colors section
- `src/components/ui/widget/behaviour-card.tsx` — welcome message + position
- `src/components/ui/widget/advanced-card.tsx` — read-only business ID
- `src/components/ui/widget/danger-zone.tsx` — delete with AlertDialog confirm
- `src/components/ui/widget/live-preview.tsx` — real-time mini browser preview + embed snippet
- `src/components/ui/widget/settings-form.tsx` — sticky action bar + two-column grid composition
- `src/app/(app)/app/(dashboard)/widget/page.tsx` — server component, fetches widget, wraps in provider
