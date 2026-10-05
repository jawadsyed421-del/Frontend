import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import Topbar from '../components/Topbar'
import Avatar from '../components/Avatar'
import Sidebar, { NAV_COMPACT } from '../components/Sidebar'
import NoteEditor from '../components/NoteEditor'
import './Inicio.css'

const BADGES = {
  '/calendar/dia': '7 nuevos',
  '/comunicados': '1 nuevo',
  '/perfil': '8 pendientes',
}

const AGENDA = [
  { group: null, items: [
    { name: 'Carolina Méndez Picado', when: 'Hoy  3:00 PM', avatar: true },
    { name: 'Juan López Torrejón', when: 'Hoy  3:45 PM', avatar: true },
  ] },
  { group: '15 DE MARZO', items: [
    { name: 'Emilio Rafael Alberto Vallamorón Rodrí..', when: 'Marzo 15, 2025  -  4:00 PM' },
    { name: 'Emilio Rafael Alberto Vallamorón Rodrí..', when: 'Marzo 15, 2025  -  4:00 PM' },
    { name: 'Juan López Torrejón', when: 'Marzo 15, 2025  -  4:00 PM', avatar: true },
    { name: 'Juan López Torrejón', when: 'Marzo 15, 2025  -  4:00 PM', avatar: true },
  ] },
  { group: '16 DE MARZO', items: [
    { name: 'Emilio Rafael Alberto Vallamorón Rodrí..', when: 'Marzo 16, 2025  -  4:00 PM' },
  ] },
]

const STATS = [
  { value: '421', caption: 'Minutos en consulta,\ndiciembre 2025' },
  { value: '1', caption: 'Cantidad de\nconsultas exitosas' },
  { value: '1', caption: 'Consultas canceladas\no reprogramadas' },
]

const NOTES = [
  {
    id: 'sin-titulo',
    title: 'Sin Título',
    body: 'Revisar la agenda del jueves 13 para sacar medio día y atender los pendientes del caso de Melissa. Ya no debo visitar la sucursal de San rafa para tramit...',
    when: 'Hace pocos segundos',
  },
  {
    id: 'enlaces',
    title: 'Enlaces que debo visitar en los próximos 14 días para e...',
    label: 'Enlaces pendientes',
    link: 'https://uxplanet.org/the-only-figma-plugins-you-need-for-...',
    when: 'Ayer',
  },
]

function StatRing({ value, caption, zero }) {
  return (
    <div className="v2stat">
      <div className="v2stat__ring">
        <span className={`v2stat__value${zero ? ' is-zero' : ''}`}>{value}</span>
      </div>
      <p className="v2stat__caption">{caption}</p>
    </div>
  )
}

function EmptyAgenda() {
  return (
    <div className="v2empty">
      <Icon name="event_available" className="v2empty__icon" />
      <p>
        Qué extraño, no tienes citas próximas
        <br />
        en tu ApoloCalendar.
      </p>
    </div>
  )
}

export default function Inicio() {
  const [params] = useSearchParams()
  const estado = params.get('estado')

  const empty = estado === 'vacio'
  const offline = estado === 'offline'
  const collaborator = estado === 'colaborador'
  const [banner, setBanner] = useState(estado === 'pago')
  const [menu, setMenu] = useState(collaborator)
  const [editor, setEditor] = useState(false)

  const badges = estado === 'pago' || empty ? undefined : BADGES
  const notes = offline ? NOTES.slice(0, 1) : NOTES

  return (
    <div className="shell">
      <Topbar
        offline={offline}
        notifications={badges ? 7 : undefined}
        onAccount={() => setMenu((m) => !m)}
      />

      {menu && (
        <>
          <button className="acctmenu__veil" type="button" onClick={() => setMenu(false)} />
          <div className="acctmenu">
            <div className="acctmenu__owner">
              <p className="acctmenu__name">Dra. Alejandra Salas Quesada</p>
              <p className="acctmenu__role">Médico propietario de la cuenta</p>
            </div>

            <div className="acctmenu__me">
              <Avatar size={40} />
              <div>
                <p className="acctmenu__name">Allison Sanabria Carvajal</p>
                <p className="acctmenu__link">Tu cuenta de colaborador</p>
              </div>
            </div>

            <ul className="acctmenu__list">
              {[
                ['account_circle', 'Editar perfil profesional'],
                ['settings', 'Configuración'],
                ['swap_horiz', 'Cambiar de cuenta'],
                ['logout', 'Cerrar sesión'],
              ].map(([icon, label]) => (
                <li key={label}>
                  <button type="button">
                    <Icon name={icon} />
                    <span>{label}</span>
                    <Icon name="chevron_right" className="acctmenu__chev" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="shell__body">
        <Sidebar items={NAV_COMPACT} badges={badges} offline={offline} />

        <main className="v2">
          {banner && (
            <div className="paybanner">
              <div>
                <h2 className="paybanner__title">Tu cuenta presenta problemas de pago</h2>
                <p className="paybanner__text">
                  Hola Andrés, te avisamos que después de varios intentos no ha sido posible
                  procesar el pago de tu cuenta. Actualiza tu método de pago para que no
                  pierdas el acceso a todos los servicios de Apolo.
                </p>
              </div>
              <div className="paybanner__actions">
                <button type="button">Actualizar método de pago</button>
                <button type="button" onClick={() => setBanner(false)}>
                  Cerrar aviso
                </button>
              </div>
            </div>
          )}

          <div className="v2__inner">
            {collaborator ? (
              <header className="v2__greet">
                <h1 className="v2__title">Hola, Allison.</h1>
                <p className="v2__sub">
                  Estás en el espacio de colaboración de la Doctora Alejandra Salas.
                </p>
              </header>
            ) : (
              <h1 className="v2__title v2__title--solo">Bienvenido, Dr. Andrés Flores</h1>
            )}

            <div className="v2__grid">
              <section className="v2card agenda">
                <h2 className="v2card__title">Próximas citas</h2>

                {empty ? (
                  <EmptyAgenda />
                ) : (
                  <div className="agenda__scroll">
                    {AGENDA.map((block, bi) => (
                      <div key={bi}>
                        {block.group && <p className="agenda__group">{block.group}</p>}
                        {block.items.map((item, i) => (
                          <div className="agenda__row" key={`${bi}-${i}`}>
                            {item.avatar ? (
                              <Avatar size={34} />
                            ) : (
                              <span className="agenda__spacer" />
                            )}
                            <div>
                              <p className="agenda__name">{item.name}</p>
                              <p className="agenda__when">{item.when}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                <div className="agenda__actions">
                  <button className="v2btn v2btn--primary" type="button">
                    <Icon name="add" />
                    Crear nueva cita
                  </button>
                  {!empty && (
                    <button className="v2btn v2btn--ghost" type="button">
                      Ver más
                      <Icon name="arrow_forward" />
                    </button>
                  )}
                </div>
              </section>

              <div className="v2__right">
                <section className="v2card stats2">
                  <h2 className="v2card__title">Estadísticas</h2>
                  <div className="stats2__rings">
                    {STATS.map((s) => (
                      <StatRing
                        key={s.caption}
                        value={empty ? '0' : s.value}
                        caption={s.caption}
                        zero={empty}
                      />
                    ))}
                  </div>
                  <button className="v2btn v2btn--soft" type="button">
                    Ver detalles de estadísticas
                  </button>
                </section>

                <section className="v2card notes2">
                  <h2 className="v2card__title">Mi cuaderno de notas</h2>

                  {empty ? (
                    <div className="notes2__empty">
                      <p>
                        Aquí tienes un cuaderno para que atrapes
                        <br />
                        todas tus ideas..
                      </p>
                      <button
                        className="v2btn v2btn--primary"
                        type="button"
                        onClick={() => setEditor(true)}
                      >
                        <Icon name="edit" />
                        Crear una nota
                      </button>
                    </div>
                  ) : (
                    <div className="notes2__row">
                      <div className="notes2__cards">
                        {notes.map((note) => (
                          <article className="note2" key={note.id}>
                            <h3 className="note2__title">{note.title}</h3>
                            {note.body && <p className="note2__body">{note.body}</p>}
                            {note.label && <p className="note2__label">{note.label}</p>}
                            {note.link && (
                              <ul className="note2__links">
                                <li>
                                  <a href="https://uxplanet.org" target="_blank" rel="noreferrer">
                                    {note.link}
                                  </a>
                                </li>
                              </ul>
                            )}
                            <p className="note2__when">
                              <Icon name="schedule" /> {note.when}
                            </p>
                          </article>
                        ))}
                      </div>

                      <div className="notes2__actions">
                        <button
                          className="v2btn v2btn--primary"
                          type="button"
                          onClick={() => setEditor(true)}
                        >
                          <Icon name="edit" />
                          Nueva nota
                        </button>
                        <button className="v2btn v2btn--soft" type="button">
                          Ver todas
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>

      {editor && <NoteEditor onClose={() => setEditor(false)} />}
    </div>
  )
}
