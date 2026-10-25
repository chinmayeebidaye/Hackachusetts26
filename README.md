# Vitalis 

Video Demo Link: [https://youtu.be/fGiueeuRNc8](https://youtu.be/fGiueeuRNc8) (Previous Uplaoded Video had a glitch with audio so this is a reupload)

A responsive, dark-themed fitness dashboard web app — recovery, strain, sleep, stress, a
strain-vs-recovery trend, and a long-term "Healthspan / Pulse Age" view. Built mobile-first,
scaling up to a multi-column desktop layout. All data comes from a mock service layer behind
a typed interface, so a real API can be dropped in later without touching the UI.

> Vitalis is an original app with its own name and logo mark. The layout and visual hierarchy
> are inspired by the structure of a popular fitness wearable UI used only as a design reference;
> no third-party branding, logos, or names are reproduced.

## Tech stack

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS** for the design system / tokens
- **Recharts** for bar, line, area, and composed charts
- **Custom SVG + Framer Motion** for the circular rings, the semicircular stress gauge, and the Healthspan particle circle
- **Zustand** for global state (selected date, trend window, logged activities)
- **Vitest + Testing Library** for unit tests

## Features

| Screen | Route | Highlights |
| --- | --- | --- |
| Home / Overview | `/` | Three animated hero rings (Sleep · Recovery · Strain), Health & Stress monitor cards, My Day, resilience insight |
| Recovery | `/recovery` | Color-following ring, HRV / RHR / Resp / Sleep rows with 30-day trend arrows, explanation + teaser |
| Strain | `/strain` | Ring + strain bands, HR-zone / steps stats, **tappable** 7-day bar chart, Average HR line, Calories |
| Sleep | `/sleep` | Performance ring, hours vs needed, stage breakdown bar, consistency / efficiency / debt, 7-day trend |
| Stress Monitor | `/stress` | Semicircular 0–3 gauge, day timeline, time-in-zones bar |
| Strain & Recovery | `/trends` | Dual-axis composed chart (strain 0–21 / recovery 0–100%), 7 / 14 / 30-day window, insight banner |
| Healthspan | `/healthspan` | Particle-style circle, Pulse Age vs chronological age, Pace-of-Aging indicator |
| Log Activity | floating “+” | Sheet with type / time / effort, validation, **recomputes strain in real time** |

Switching the date in the header updates every screen. Rings animate from 0 on load. Tapping
a bar in the strain chart selects that day. Loading, empty, and error states are handled
throughout, and `prefers-reduced-motion` is respected.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

### Other scripts

```bash
npm run build   # production build (type-check + lint)
npm start       # serve the production build
npm run lint    # ESLint
npm test        # run unit tests once
npm run test:watch
```

## Project structure

```
src/
  app/                 # App Router pages (one per screen)
  components/
    rings/             # Ring, HeroRing, SemiGauge, ParticleCircle (custom SVG)
    charts/            # Recharts: StrainBar, AvgHRLine, SleepStages, StressTimeline,
                       #           StrainRecovery, TimeInZones, TrendLine
    cards/             # StatCard, MetricRow, InsightCard, ActivityRow, states
    shell/             # Header, DateSwitcher, Tabs, BottomNav, Fab, AppShell
    activity/          # LogActivitySheet
    brand/             # Logo
  features/            # Screen compositions: home / recovery / strain / sleep /
                       #   stress / trends / healthspan
  lib/
    data/              # types, service interface, mock service, seed generator
    store/             # Zustand app store
    utils/             # getRecoveryColor, aggregation helpers, formatters
    hooks/             # useAsync, data hooks
    theme/             # design tokens
  styles/              # globals.css
```

## Design system

- Near-black background gradient (`#0B0F14 → #12171D`); card surfaces `#1A2028`, 18px radius, hairline borders.
- Metric color language: **Recovery** red/yellow/green by score, **Strain** blue, **Sleep** soft blue-grey, **Stress** green→yellow→orange, **Healthspan** teal/green.
- Condensed numerals (Barlow Semi Condensed) for big values; Inter for body. Uppercase, letter-spaced micro-labels.
- Every recovery color (rings + badges) comes from a single `getRecoveryColor(score)` util so coloring is consistent everywhere.

## Swapping in a real API

All data access goes through `DataService` (`src/lib/data/service.ts`). The app uses
`mockService.ts` today. To use a real backend, implement the same interface and return it from
`getDataService()` — no component changes required.

## Mock data

`src/lib/data/seed.ts` deterministically generates **60 days** of correlated data (a high-strain
day tends to lower the next day's recovery; sleep performance loosely tracks recovery; calories
and steps scale with strain). This keeps charts and trends believable across reloads.

## Accessibility

- Rings, gauges, and charts expose `role="img"` with an `aria-label` that includes the numeric value.
- Information conveyed by color is also conveyed as text (zone labels, trend arrows).
- All interactive controls are real buttons/links with visible focus styling and keyboard support.
- Targets WCAG 2.1 AA contrast. Full WCAG validation requires manual testing with assistive technologies and expert review.

## Testing

Unit tests cover the scoring/aggregation core:

- `src/lib/utils/color.test.ts` — `getRecoveryColor` boundaries (0 / 33 / 34 / 66 / 67 / 100) and clamping.
- `src/lib/utils/aggregate.test.ts` — N-day windowing, averages, trend direction, time-in-zones.

## Screenshots

Run the app and capture these routes for the docs:

- `/` — Overview with the three hero rings
- `/recovery`, `/strain`, `/sleep` — detail screens
- `/stress` — semicircular gauge + timeline
- `/trends` — dual-axis strain vs recovery
- `/healthspan` — Pulse Age particle circle

Save images to `docs/screenshots/` and link them here.

## Out of scope

Real wearable integration, authentication, payments, and full Coaching / Community features
(these are placeholder screens).

## Spec

Requirements, design, and task breakdown live in `.kiro/specs/vitalis/`
(`requirements.md`, `design.md`, `tasks.md`).
