import { useEffect, useState } from 'react'
import Icon from './Icon'
import './SkipAppointmentModal.css'

const REASONS = [
  { id: 'no-show', label: 'El paciente no se presentó a la cita' },
  {
    id: 'attended-no-module',
    label:
      'El paciente si asistió a la cita, pero no utilicé el módulo de consulta médica de Apolo en el servicio de atención',
  },
]

export default function SkipAppointmentModal({ onClose, onConfirm }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-scrim" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="skip-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <Icon name="close" />
        </button>

        <h2 id="skip-modal-title" className="modal__title">
          ¿Por qué razón saltarás esta cita médica?
        </h2>

        <p className="modal__text">
          Vamos a guardar esta información en el historial de citas dentro del
          expediente del paciente, y también se almacenará para proporcionarte
          estadísticas sobre el control de asistencia y puedas apoyar la toma de
          decisiones.
        </p>

        <div className="modal__options" role="radiogroup">
          {REASONS.map((reason) => (
            <label
              key={reason.id}
              className={`radio${selected === reason.id ? ' is-checked' : ''}`}
            >
              <input
                type="radio"
                name="skip-reason"
                value={reason.id}
                checked={selected === reason.id}
                onChange={() => setSelected(reason.id)}
              />
              <span className="radio__dot" aria-hidden="true">
                <Icon name="check" />
              </span>
              <span className="radio__label">{reason.label}</span>
            </label>
          ))}
        </div>

        <div className="modal__footer">
          <button className="modal__btn modal__btn--cancel" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="modal__btn modal__btn--confirm"
            type="button"
            onClick={() => onConfirm(selected)}
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  )
}
