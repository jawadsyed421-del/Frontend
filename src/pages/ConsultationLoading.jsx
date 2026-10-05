import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './ConsultationLoading.css'

/** `?hold=1` freezes an interstitial so it can be inspected. */
function useAdvance(to, delay = 2200) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const hold = params.get('hold') === '1'

  useEffect(() => {
    if (hold) return undefined
    const t = setTimeout(() => navigate(to), delay)
    return () => clearTimeout(t)
  }, [hold, navigate, to, delay])
}

/**
 * Two full-bleed interstitials the prototype shows between the dashboard and
 * the consultation module (frames 10 and 11).
 */
export function PreparingConsultation({ patientFirstName = 'Andrés' }) {
  useAdvance('/consulta/abriendo')

  return (
    <div className="interstitial">
      <p className="interstitial__lead">
        Estamos preparando el módulo de consulta para{' '}
        <span className="interstitial__name">{patientFirstName}.</span>
      </p>
    </div>
  )
}

export function OpeningConsultation() {
  useAdvance('/consulta')

  return (
    <div className="interstitial interstitial--stacked">
      <h1 className="interstitial__title">Abriendo el módulo de consulta</h1>
      <p className="interstitial__sub">
        Recuerda que para brindar atención médica a un nuevo paciente deberás crear antes un
        expediente para esta persona.
      </p>
    </div>
  )
}
