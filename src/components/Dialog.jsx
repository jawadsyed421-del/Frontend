import { useEffect } from 'react'
import Icon from './Icon'
import './Dialog.css'

function useEscape(onClose) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
}

/**
 * Dark-scrim dialog used across the consultation and sign-up flows.
 * `variant` picks the two shapes in the prototype:
 *  - "confirm": narrow, centred title with a round close button (Eliminar prescripción)
 *  - "panel":   wider, left-aligned title, no close button (Crear expediente, cuenta existente)
 */
export default function Dialog({
  variant = 'panel',
  title,
  onClose,
  closable = variant === 'confirm',
  children,
  actions,
}) {
  useEscape(onClose)

  return (
    <div
      className={`dlg-scrim${variant === 'confirm' ? ' dlg-scrim--light' : ''}`}
      onMouseDown={onClose}
    >
      <div
        className={`dlg dlg--${variant}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="dlg__head">
          <h2 className="dlg__title">{title}</h2>
          {closable && (
            <button className="dlg__close" type="button" onClick={onClose} aria-label="Cerrar">
              <Icon name="close" />
            </button>
          )}
        </div>

        {children && <div className="dlg__body">{children}</div>}
        {actions && <div className="dlg__actions">{actions}</div>}
      </div>
    </div>
  )
}
