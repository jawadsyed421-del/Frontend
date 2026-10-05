# Apolo — frontend

React rebuild of the Figma prototype captured in [`design-refs/`](design-refs).

```bash
npm install
npm run dev     # http://localhost:5173
```

## Screens

| Route | Source |
| --- | --- |
| `/` | Inicio dashboard, appointment toast, skip-appointment modal (PNG frames 1–9) |
| `/consulta/preparando` | "Estamos preparando el módulo de consulta…" (frame 10) |
| `/consulta/abriendo` | "Abriendo el módulo de consulta" (frame 11) |
| `/consulta` | Módulo de consulta médica — 10 sections (PDF 12–47) |
| `/consulta/sin-expediente` | Same, with the "Crear expediente digital" prompt (PDF 56–60) |
| `/expediente` | Expediente digital → Datos personales (PDF 48) |
| `/expediente/historia-clinica` | Antecedentes, ficha médica, estudios (PDF 49) |
| `/expediente/historial-citas` | Appointment history table (PDF 50–55) |
| `/expediente/nuevo` | Crear un expediente digital wizard (PDF 58–59) |
| `/registro/codigo` | Tu código de médico (PDF 61–66) |
| `/registro/cuenta` | Crea tu cuenta de Apolo (PDF 67–79) |
| `/registro/incertidumbre` | "No eres la única persona que siente incertidumbre" (PDF 80–81) |
| `/registro/prosperidad` | "Deseamos lo mismo para tu futuro, prosperidad" (PDF 82–83) |
| `/registro/completar` | Completa tu registro (PDF 84–85) |
| `/registro/verificacion` | Verificación de identidad por foto (PDF 86–88) |
| `/registro/revision` | Revisión de la foto enviada (PDF 89) |
| `/registro/bienvenida` | Bienvenida al futuro de la medicina privada (PDF 90) |
| `/calendar/dia` | ApoloCalendar — vista Día, con tooltip, panel de detalles y flujo de cancelación (PDF 91–124) |
| `/calendar/semana` | ApoloCalendar — vista Semana (PDF 125–129) |
| `/calendar/mes` | ApoloCalendar — vista Mes (PDF 130–133) |
| `/calendar/ano` | ApoloCalendar — vista Año (PDF 134–140, 143–144) |
| `/calendar/pacientes` | Pacientes en ApoloCalendar — búsqueda (PDF 141–142) |
| `/calendar/paciente` | Citas de un paciente (PDF 145–148) |
| `/inicio` | Dashboard posterior (PDF 149, 151, 154, 162–164) |
| `/inicio?estado=vacio` | Estado vacío (PDF 152) |
| `/inicio?estado=pago` | Aviso de problemas de pago (PDF 150) |
| `/inicio?estado=offline` | Modo offline + contadores (PDF 155–158) |
| `/inicio?estado=colaborador` | Espacio de colaboración + menú de cuenta (PDF 159–160) |

`/inicio` is the **later** dashboard design from the end of the deck: a reduced
sidebar, grouped agenda, three stat rings and timestamped notes. The original
dashboard from the PNG frames stays at `/`. Say the word and I'll make the new
one the landing route.

The two interstitials auto-advance after 2.2s; append `?hold=1` to freeze one.
The remaining sidebar destinations render a stub — the sources don't cover them.

## Scaling

The prototype is drawn on a 1728px-wide frame. Every length in the app is
written in **rem against that frame**, where `1rem == 16px`, and the root
font-size is scaled by the viewport:

```css
html { font-size: clamp(0.6875rem, 0.9259vw, 1rem); }  /* 16 / 1728 = 0.9259vw */
```

So the whole design scales as one piece instead of a 1728px layout being
crammed into a smaller window — which is what made the screens read as zoomed
in. A 1440px laptop renders the frame at 83%: same proportions, everything on
screen. Above 1728px it stops growing and the `fr` columns take up the slack.
The clamp is in rem, not px, so a raised browser default font size still
scales the UI up.

Below 1188px the root font-size floors and **layout** takes over. There are
three tiers, all defined in `src/styles/global.css` plus a block at the foot of
each page's own stylesheet:

| Tier | Width | Behaviour |
| --- | --- | --- |
| Desktop | ≥ 1181px | full sidebar; the 1728px frame, scaled |
| Tablet | 768–1180px | sidebar collapses to a 64px icon rail (labels stay in the a11y tree, badges become dots); two-column boards stack at ≤1000px; the calendar toolbar and the expediente tab strip wrap or scroll |
| Phone | ≤ 767px | the rail leaves the flow and becomes a **drawer** opened from a menu button in the topbar; everything is one column |

### The phone drawer

`src/components/nav-drawer.jsx` holds the open state in a context, because the
button that opens the drawer lives in the `Topbar` while the nav it opens is a
sibling further down the tree — and not every screen has one. A nav registers
itself on mount, so the menu button only appears when there is something to
open (the consultation module has no nav, and grows no button). The drawer
closes on navigation, on Escape and on a tap outside, and the page behind it
holds still while it is open.

A screen's **own** rail is not app-level navigation and so does not go in the
drawer: the expediente's section rail becomes a horizontal scrolling strip
above the content instead, and `.shell__body` stacks to make room for it.

Grids that cannot compress — the calendar's week and month views — keep a
usable column width and scroll sideways rather than crushing seven columns
into 390px. The header row and the grid share `.cal__body` as their scroll
container so they stay aligned.

Those overrides carry an extra class of specificity on purpose: each page's CSS
is imported by its own lazily-loaded module, so it lands *after* `global.css`
in the cascade and load order is not the same in dev and in a build.

**When adding styles, write rem, not px** — a px value will not scale with the
rest of the frame. Hairlines (borders, 1–3px offsets) are deliberately left in
px so they stay crisp.

## Performance

- **Icon font subsetted** to the ~86 symbols actually used
  (`icon_names=` in `index.html`): **1783 KB → 23 KB**, a 98.7% cut. Add the
  name there when you introduce a new icon, or it will render as its ligature text.
- **Routes are code-split** — only the opened screen downloads. Each screen
  adds 1–13 KB.
- **React, ReactDOM and the router are a separate chunk** (`manualChunks` in
  `vite.config.js`). The app entry is 18 KB against a 164 KB vendor chunk, so a
  UI change ships a small diff and leaves the vendor chunk in cache.
- **The calendar's views are memoised.** Page state there is coarse — opening
  the date picker or a detail panel re-renders the screen — so `memo` keeps a
  single click from rebuilding the year grid (twelve months, ~500 day buttons).
- `Untitled.pdf` (219 MB) is gitignored; it is a design source, not an asset.

## Motion

Durations and easing live as tokens in `src/styles/tokens.css`; the rules are in
`global.css`, so screens stay consistent without each one restating them:

- route changes play a short rise-and-fade (`App.jsx` keys the wrapper on the path)
- every overlay — dialog, calendar detail panel, note editor, toast — shares one
  scrim-fade plus surface-rise entrance
- controls ease on hover and give slightly on press; one `:focus-visible` ring
  across the app
- scrollbars are slim and only ink while their area is in use
- all of it collapses under `prefers-reduced-motion: reduce`

## Fidelity notes

`Untitled.pdf` is a vector print of the same prototype, so for pages 12–73 the
text, font sizes and coordinates were read straight out of the PDF content
stream (1840pt page → 1728px design, a factor of 0.9391) instead of measured off
pixels. Colors and geometry for the PNG frames were sampled from the images; the
comments in `src/styles/tokens.css` and each page's CSS record the measured
values. Element boxes land within ~3px of the prototype at a 1728px viewport.

The prototype's typeface is a Circular/Google-Sans-style geometric sans that
isn't bundled with the captures. **DM Sans** is the substitute — the closest
freely available match, and within ~2% on string widths. Swap the Google Fonts
link in `index.html` and `--font` in `src/styles/tokens.css` if you have a
license for the original.
