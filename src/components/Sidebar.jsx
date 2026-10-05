import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import './Sidebar.css'

/** Full navigation (PNG frames 1–9, PDF pages 91–148). */
export const NAV_FULL = [
  { to: '/', icon: 'home', label: 'Inicio', end: true },
  { to: '/calendar/dia', icon: 'calendar_today', label: 'ApoloCalendar' },
  { to: '/expediente', icon: 'folder_shared', label: 'Expediente Digital' },
  { to: '/pacientes', icon: 'format_list_bulleted', label: 'Lista de pacientes' },
  { to: '/blog', icon: 'feed', label: 'ApoloBlog' },
  { to: '/obsequios', icon: 'volunteer_activism', label: 'Obsequios' },
  { to: '/solicitudes', icon: 'person_add', label: 'Solicitudes' },
  { to: '/comunicados', icon: 'privacy_tip', label: 'Comunicados oficiales' },
  { to: '/perfil', icon: 'account_circle', label: 'Mi perfil profesional' },
  { to: '/preferencias', icon: 'settings', label: 'Preferencias de cuenta' },
]

/** Reduced navigation used by the later dashboard (PDF pages 149–164). */
export const NAV_COMPACT = [
  { to: '/inicio', icon: 'home', label: 'Inicio', end: true },
  { to: '/calendar/dia', icon: 'calendar_today', label: 'ApoloCalendar' },
  { to: '/expediente', icon: 'folder_shared', label: 'Expediente Digital' },
  { to: '/pacientes', icon: 'format_list_bulleted', label: 'Lista de pacientes' },
  { to: '/comunicados', icon: 'privacy_tip', label: 'Comunicados oficiales' },
  { to: '/perfil', icon: 'account_circle', label: 'Mi perfil profesional' },
  { to: '/preferencias', icon: 'settings', label: 'Preferencias de cuenta' },
]

export default function Sidebar({ items = NAV_FULL, badges, offline = false }) {
  return (
    <nav className="sidebar" aria-label="Navegación principal">
      <ul className="sidebar__list">
        {items.map((item) => {
          const badge = badges?.[item.to]
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `sidebar__item${isActive ? ' is-active' : ''}${badge ? ' has-badge' : ''}`
                }
              >
                <Icon name={item.icon} className="sidebar__icon" />
                <span className="sidebar__text">
                  <span className="sidebar__label">{item.label}</span>
                  {badge && (
                    <span className="sidebar__badge">
                      <span className="sidebar__dot" aria-hidden="true" />
                      {badge}
                    </span>
                  )}
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>

      {offline && (
        <p className="sidebar__offline">
          <Icon name="wifi_off" />
          No estás conectado
          <br />a internet
        </p>
      )}
    </nav>
  )
}
