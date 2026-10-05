import './AppointmentToast.css'

export default function AppointmentToast({
  name,
  minutes = '3:30',
  onStart,
  onSkip,
}) {
  return (
    <aside className="appt-toast" role="status">
      <div className="appt-toast__avatar" aria-hidden="true">
        <svg viewBox="0 0 80 80" width="80" height="80">
          <circle cx="40" cy="40" r="40" fill="#e9ebee" />
          <circle cx="40" cy="31" r="13" fill="#c3c7cc" />
          <path
            d="M14 74c3-14 13-21 26-21s23 7 26 21z"
            fill="#c3c7cc"
          />
        </svg>
      </div>

      <div className="appt-toast__body">
        <p className="appt-toast__name">{name}</p>
        <p className="appt-toast__text">
          Tienes una cita médica programada con este paciente para iniciar en{' '}
          <span className="appt-toast__time">{minutes}</span> minutos.
        </p>
      </div>

      <div className="appt-toast__actions">
        <button className="appt-toast__start" type="button" onClick={onStart}>
          Iniciar consulta
        </button>
        <button className="appt-toast__skip" type="button" onClick={onSkip}>
          Saltar esta cita
        </button>
      </div>
    </aside>
  )
}
