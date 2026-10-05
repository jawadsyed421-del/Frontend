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

## Performance

- **Icon font subsetted** to the ~86 symbols actually used
  (`icon_names=` in `index.html`): **1783 KB → 23 KB**, a 98.7% cut. Add the
  name there when you introduce a new icon, or it will render as its ligature text.
- **Routes are code-split** — only the opened screen downloads. First load is
  182 KB JS + 11 KB CSS; each screen adds 1–12 KB.
- `Untitled.pdf` (219 MB) is gitignored; it is a design source, not an asset.

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
