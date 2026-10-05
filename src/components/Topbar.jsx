import Icon from './Icon'
import './Topbar.css'

export default function Topbar({ children, offline = false, notifications, onAccount }) {
  return (
    <header className="topbar">
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
