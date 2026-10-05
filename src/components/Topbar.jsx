import Icon from './Icon'
import { useNav } from './nav-drawer'
import './Topbar.css'

export default function Topbar({ children, offline = false, notifications, onAccount }) {
  const { open, setOpen, hasNav } = useNav()

  return (
    <header className="topbar">
      {hasNav && (
        <button
          className="topbar__menu"
          type="button"
          aria-label={open ? 'Cerrar navegación' : 'Abrir navegación'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      )}

      <div className="topbar__slot">{children}</div>

      <div className="topbar__actions">
        {offline && <span className="topbar__offline">Modo offline</span>}

        <button className="topbar__icon-btn" type="button" aria-label="Ayuda">
          <Icon name="help" />
        </button>

        <button
          className="topbar__icon-btn topbar__icon-btn--filled"
          type="button"
          aria-label="Notificaciones"
          onClick={onAccount}
        >
          <Icon name="notifications" />
          {notifications ? <span className="topbar__count">{notifications}</span> : null}
        </button>
      </div>
    </header>
  )
}
