import Icon from './Icon'
import './ConsultationBar.css'

/**
 * Sticky bar pinned to the bottom of the viewport during an open consultation.
 * `back` renders the "Volver al módulo de consulta" control used on the
 * expediente screens; the consultation module itself omits it.
 */
export default function ConsultationBar({ elapsed = '1:37', back, onBack, onFinish }) {
  return (
    <div className="cbar">
      {back ? (
        <button className="cbar__back" type="button" onClick={onBack}>
          <Icon name="undo" />
          Volver al módulo de consulta
        </button>
      ) : (
        <span />
      )}

      <div className="cbar__right">
        <p className="cbar__label">
          Tiempo de consulta
          <br />
          transcurrido:
        </p>
        <p className="cbar__time">{elapsed}</p>
        <span className="cbar__sep" />
        <button className="cbar__finish" type="button" onClick={onFinish}>
          Finalizar consulta médica
        </button>
      </div>
    </div>
  )
}
