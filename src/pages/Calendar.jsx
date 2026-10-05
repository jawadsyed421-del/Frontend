import { memo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import {
  HOURS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
  WEEKDAY_INITIALS,
  MONTHS,
  DAY_EVENTS,
  EVENT_DETAILS,
  WEEK_EVENTS,
  MONTH_CHIPS,
  MONTH_LOAD,
  YEAR_2021,
} from '../data/calendar'
import './Calendar.css'

const VIEWS = [
  ['dia', 'Día'],
  ['semana', 'Semana'],
  ['mes', 'Mes'],
  ['ano', 'Año'],
]

const TITLES = {
  dia: 'Miércoles 21 de abril de 2021',
  semana: 'Del 19 al 25 de abril, 2021',
  mes: 'Abril de 2021',
  ano: 'Año 2021',
}

/* One hour of the time grid, in rem so the calendar scales with the frame
   (62px at the 1728px design width). */
const HOUR = 62 / 16
const rem = (n) => `${n}rem`

/* ------------------------------ shared bits ------------------------------ */

function MiniMonthBase() {
  const [first, length] = YEAR_2021[3] // April 2021
  const cells = []
  for (let i = 0; i < first; i += 1) cells.push({ n: 31 - first + i + 1, muted: true })
  for (let d = 1; d <= length; d += 1) cells.push({ n: d })
  let next = 1
  while (cells.length % 7) cells.push({ n: next++, muted: true })

  return (
    <div className="minical" onMouseDown={(e) => e.stopPropagation()}>
      <div className="minical__head">
        <button type="button" aria-label="Mes anterior">
          <Icon name="chevron_left" />
        </button>
        <p>ABRIL DE 2021</p>
        <button type="button" aria-label="Mes siguiente">
          <Icon name="chevron_right" />
        </button>
      </div>
      <div className="minical__grid">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
          <span className="minical__dow" key={d}>
            {d}
          </span>
        ))}
        {cells.map((c, i) => (
          <button
            key={i}
            type="button"
            className={`minical__day${c.muted ? ' is-muted' : ''}${
              !c.muted && c.n === 21 ? ' is-today' : ''
            }`}
          >
            {c.n}
          </button>
        ))}
      </div>
    </div>
  )
}

function TimeGrid({ columns = 1, children }) {
  return (
    <div className="grid">
      <div className="grid__gutter">
        {HOURS.map((h) => (
          <span className="grid__hour" key={h} style={{ height: rem(HOUR) }}>
            {h}
          </span>
        ))}
      </div>
      <div
        className="grid__canvas"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns }, (_, c) => (
          <div className="grid__col" key={c}>
            {HOURS.map((h) => (
              <div className="grid__slot" key={h} style={{ height: rem(HOUR) }} />
            ))}
          </div>
        ))}
        {children}
      </div>
    </div>
  )
}

/* -------------------------------- day view ------------------------------- */

function DayViewBase({ onOpenEvent, dimmed }) {
  return (
    <>
      <div className="dayhead">
        <span className="dayhead__num">21</span>
      </div>

      <TimeGrid>
        {DAY_EVENTS.map((ev) => (
          <button
            key={ev.id}
            type="button"
            className={`event${dimmed ? ' is-dim' : ''}`}
            aria-describedby={`event-tip-${ev.id}`}
            style={{
              top: rem(ev.start * HOUR),
              height: rem((ev.end - ev.start) * HOUR - 0.25),
              left: `calc(${(100 * ev.lane) / ev.lanes}% + 0.1875rem)`,
              width: `calc(${(100 * (ev.span || 1)) / ev.lanes}% - 0.375rem)`,
              background: ev.color,
            }}
            onClick={() => onOpenEvent(ev)}
          >
            <span className="event__line">
              {ev.patient} &nbsp;•&nbsp; {ev.time}
            </span>
            <span className="event__line event__line--sub">
              ID: {ev.docId} &nbsp;•&nbsp; {ev.kind}
            </span>

            <span className="tip" id={`event-tip-${ev.id}`} role="tooltip">
              <span className="tip__label">PACIENTE</span>
              <span className="tip__value">{ev.patient}</span>
              <span className="tip__label">IDENTIFICACIÓN</span>
              <span className="tip__value">{ev.docId}</span>
              <span className="tip__label">HORA</span>
              <span className="tip__value">{ev.time}</span>
              <span className="tip__label">MODALIDAD</span>
              <span className="tip__value">{ev.kind}</span>
            </span>
          </button>
        ))}
      </TimeGrid>
    </>
  )
}

/* ------------------------------- week view ------------------------------- */

function WeekViewBase() {
  const days = [19, 20, 21, 22, 23, 24, 25]
  const colW = 100 / 7

  return (
    <>
      <div className="weekhead">
        {WEEKDAYS_SHORT.map((label, i) => (
          <div className="weekhead__cell" key={label}>
            <span className={`weekhead__dow${i === 0 ? ' is-today' : ''}`}>{label}</span>
            <span className={`weekhead__num${i === 0 ? ' is-today' : ''}`}>{days[i]}</span>
          </div>
        ))}
      </div>

      <TimeGrid columns={7}>
        {WEEK_EVENTS.map((ev) => {
          const narrow = ev.narrow != null
          return (
            <div
              key={ev.id}
              className="wevent"
              style={{
                top: rem(ev.start * HOUR),
                height: rem((ev.end - ev.start) * HOUR - 0.25),
                left: narrow
                  ? `calc(${ev.day * colW}% + ${(4 + ev.narrow * 30) / 16}rem)`
                  : `calc(${ev.day * colW}% + 0.25rem)`,
                width: narrow ? '1.75rem' : `calc(${colW}% - 0.5rem)`,
                background: ev.color,
              }}
            >
              <span className="wevent__title">{ev.title}</span>
              <span className="wevent__time">{ev.time}</span>
            </div>
          )
        })}
      </TimeGrid>
    </>
  )
}

/* ------------------------------- month view ------------------------------ */

function MonthViewBase() {
  const [first, length] = YEAR_2021[3]
  const cells = []
  for (let i = 0; i < first; i += 1)
    cells.push({ label: String(29 + i).padStart(2, '0'), muted: true })
  for (let d = 1; d <= length; d += 1)
    cells.push({ label: String(d).padStart(2, '0'), day: d })
  let overflow = 1
  while (cells.length % 7) {
    cells.push({
      label: overflow === 1 ? '01 MAYO' : String(overflow).padStart(2, '0'),
      muted: true,
    })
    overflow += 1
  }

  return (
    <div className="month">
      <div className="month__head">
        {WEEKDAYS_LONG.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="month__grid">
        {cells.map((c, i) => {
          const load = c.day != null ? MONTH_LOAD[c.day] : undefined
          return (
            <div className={`month__cell${c.muted ? ' is-muted' : ''}`} key={i}>
              <span className={`month__num${c.day === 18 ? ' is-today' : ''}`}>{c.label}</span>
              {load !== undefined && (
                <div className="month__chips">
                  {MONTH_CHIPS.map((chip) => (
                    <span className={`chip chip--${chip.tone}`} key={chip.time}>
                      {chip.time}
                    </span>
                  ))}
                  {load > 0 && <span className="month__more">y {load} más..</span>}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* -------------------------------- year view ------------------------------ */

function YearMonthBase({ index }) {
  const [first, length] = YEAR_2021[index]
  const prevLength = YEAR_2021[(index + 11) % 12][1]
  const cells = []
  for (let i = 0; i < first; i += 1) cells.push({ n: prevLength - first + i + 1, muted: true })
  for (let d = 1; d <= length; d += 1) cells.push({ n: d })
  let next = 1
  while (cells.length < 42) cells.push({ n: next++, muted: true })

  return (
    <div className="ymonth">
      <h3 className="ymonth__name">{MONTHS[index]}</h3>
      <div className="ymonth__grid">
        {WEEKDAY_INITIALS.map((d, i) => (
          <span className="ymonth__dow" key={i}>
            {d}
          </span>
        ))}
        {cells.map((c, i) => (
          <span
            key={i}
            className={`ymonth__day${c.muted ? ' is-muted' : ''}${
              !c.muted && index === 3 && c.n === 15 ? ' is-today' : ''
            }`}
          >
            {c.n}
          </span>
        ))}
      </div>
    </div>
  )
}

function YearViewBase() {
  return (
    <div className="year">
      {MONTHS.map((_, i) => (
        <YearMonth index={i} key={i} />
      ))}
    </div>
  )
}

/* ------------------------------ detail panel ----------------------------- */

function EventPanel({ onClose, onDelete, dim }) {
  return (
    <div className={`panel-scrim${dim ? ' is-dim' : ''}`} onMouseDown={onClose}>
      <div className="panel" onMouseDown={(e) => e.stopPropagation()}>
        <header className="panel__head">
          <h2 className="panel__title">Detalles de cita</h2>
          <div className="panel__tools">
            <button type="button" aria-label="Eliminar cita" onClick={onDelete}>
              <Icon name="delete" />
            </button>
            <button type="button" aria-label="Editar cita">
              <Icon name="edit" />
            </button>
            <button type="button" aria-label="Cerrar" onClick={onClose}>
              <Icon name="close" />
            </button>
          </div>
        </header>

        <div className="panel__body">
          <p className="panel__patient">{EVENT_DETAILS.patient}</p>
          <p className="panel__id">Identificación: {EVENT_DETAILS.docId}</p>

          <button className="panel__link" type="button">
            Ver información del paciente
          </button>

          <ul className="panel__rows">
            {EVENT_DETAILS.rows.map(([icon, text, link]) => (
              <li key={text}>
                {icon === 'swatch' ? (
                  <span className="panel__swatch" aria-hidden="true" />
                ) : (
                  <Icon name={icon} />
                )}
                <span>
                  {text} {link && <a href="#ubicacion">{link}</a>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------- page ---------------------------------- */

/* The views below are pure functions of their props, and the page's state is
   coarse — opening the date picker or an event panel re-renders the whole
   calendar. Memoising them keeps a panel toggle from rebuilding the year grid
   (twelve months, ~500 day buttons) on every click. */
const MiniMonth = memo(MiniMonthBase)
const DayView = memo(DayViewBase)
const WeekView = memo(WeekViewBase)
const MonthView = memo(MonthViewBase)
const YearMonth = memo(YearMonthBase)
const YearView = memo(YearViewBase)

export default function Calendar() {
  const navigate = useNavigate()
  const { view = 'dia' } = useParams()
  const [picker, setPicker] = useState(false)
  const [openEvent, setOpenEvent] = useState(null)
  const [flow, setFlow] = useState(null) // 'comment' | 'error' | 'done'

  const dismiss = () => {
    setFlow(null)
    setOpenEvent(null)
  }

  return (
    <div className="shell">
      <Topbar />

      <div className="shell__body">
        <Sidebar />

        <main className="cal">
          <header className="cal__bar">
            <p className="cal__brand">
              <span>APOLO</span>
              <em>calendar</em>
            </p>

            <div className="cal__views">
              {VIEWS.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={`cal__view${view === id ? ' is-active' : ''}`}
                  onClick={() => navigate(`/calendar/${id}`)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="cal__nav">
              <button type="button" aria-label="Anterior">
                <Icon name="chevron_left" />
              </button>
              <button type="button" className="cal__today">
                Hoy
              </button>
              <button type="button" aria-label="Siguiente">
                <Icon name="chevron_right" />
              </button>
            </div>

            <button className="cal__search" type="button" aria-label="Buscar">
              <Icon name="search" />
            </button>

            <button className="cal__add" type="button">
              Agregar una cita
            </button>
          </header>

          <div className="cal__title-row">
            <h1 className={`cal__title${view === 'mes' ? ' cal__title--lg' : ''}`}>
              {TITLES[view] || TITLES.dia}
            </h1>
            <button
              className="cal__picker"
              type="button"
              onClick={() => setPicker((p) => !p)}
              aria-label="Elegir fecha"
            >
              <Icon name="calendar_today" />
              <Icon name="arrow_drop_down" />
            </button>
            {picker && <MiniMonth />}
          </div>

          {/* The view modifier lets the phone styles scroll the week and month
              grids sideways without touching the day and year layouts. */}
          <div
            className={`cal__body cal__body--${view}${
              view === 'mes' ? ' cal__body--flush' : ''
            }`}
          >
            {view === 'semana' ? (
              <WeekView />
            ) : view === 'mes' ? (
              <MonthView />
            ) : view === 'ano' ? (
              <YearView />
            ) : (
              <DayView onOpenEvent={setOpenEvent} dimmed={Boolean(openEvent || flow)} />
            )}
          </div>
        </main>
      </div>

      {openEvent && (
        <EventPanel
          dim={Boolean(flow)}
          onClose={() => setOpenEvent(null)}
          onDelete={() => setFlow('comment')}
        />
      )}

      {flow === 'comment' && (
        <div className="panel-scrim" onMouseDown={() => setFlow(null)}>
          <div className="comment" onMouseDown={(e) => e.stopPropagation()}>
            <header className="comment__head">
              <h2>Si quieres, puedes dejar un comentario al paciente.</h2>
              <button type="button" aria-label="Cerrar" onClick={() => setFlow(null)}>
                <Icon name="close" />
              </button>
            </header>
            <textarea
              className="comment__box"
              placeholder="Aquí podrías explicar el motivo de cancelación.."
            />
            <div className="comment__actions">
              <button className="comment__finish" type="button" onClick={() => setFlow('done')}>
                Finalizar
              </button>
            </div>
          </div>
        </div>
      )}

      {(flow === 'done' || flow === 'error') && (
        <div className="panel-scrim is-dim" onMouseDown={dismiss}>
          <div className="toastbox" onMouseDown={(e) => e.stopPropagation()}>
            <div className="toastbox__text">
              {flow === 'done' ? (
                <p>
                  La cita se canceló correctamente. Ya notificamos al paciente acerca de este
                  cambio.
                </p>
              ) : (
                <div>
                  <p className="toastbox__oops">¡Lo sentimos!</p>
                  <p>
                    Parece que algo salió mal y no se pudo completar el proceso. Ya estamos
                    trabajando para solucionarlo.
                  </p>
                </div>
              )}
            </div>

            <div className="toastbox__actions">
              {flow === 'done' && (
                <button className="toastbox__ghost" type="button" onClick={dismiss}>
                  Deshacer
                </button>
              )}
              <button className="toastbox__ok" type="button" onClick={dismiss}>
                {flow === 'done' ? 'OK' : 'De acuerdo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
