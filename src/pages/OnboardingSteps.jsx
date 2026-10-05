import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import './OnboardingSteps.css'

/** Bare shell for the post-signup flow: a rule under the viewport top and an
 *  optional round leading button. No "Iniciar sesión", no legal footer. */
function FlowShell({ lead, children }) {
  return (
    <div className="flow">
      <header className="flow__top" />
      {lead && <div className="flow__lead">{lead}</div>}
      <main className="flow__main">{children}</main>
    </div>
  )
}

function RoundButton({ icon, onClick, label }) {
  return (
    <button className="flow__round" type="button" onClick={onClick} aria-label={label}>
      <Icon name={icon} />
    </button>
  )
}

/* ---------------- Outlook responses (pages 80–83) ---------------- */

const MESSAGES = {
  incertidumbre: {
    title: 'Andrés, no eres la única persona que siente incertidumbre.',
    body: [
      'De hecho, 6 de cada 10 médicos experimentan incertidumbre en relación a su futuro profesional.',
      'Sabemos que el mundo actual es muy complejo. Las industrias no solo han cambiado, también se han reconstruido.',
      'En este proceso muchos han quedado rezagados y confundidos, cediendo paso a nuevos participantes que se adaptan mejor a un entorno en evolución.',
      'Ya no vivimos en la era del cambio, vivimos en un cambio de era.',
      ['Apolo se creó para que triunfes con el cambio, y ', 'nunca', ' te quedes rezagado.'],
    ],
  },
  prosperidad: {
    title: 'Andrés, deseamos lo mismo para tu futuro, prosperidad.',
    body: [
      'Nos entusiasma mucho llegar a profesionales como tú, que se sienten seguros de si mismos, de sus servicios y de su futuro.',
      'Dato curioso: De cada 10 médicos que aseguran visualizar un futuro próspero, 8 de ellos eligen quedarse en Apolo.',
      'Además de responder lo mismo, tienen tres aspectos en común.',
      'Se adaptan a los cambios, saben que un futuro próspero hay que buscarlo proactivamente, y el tercero, son personas que se apoyan en las mejores tecnologías para mejorar su oferta de valor.',
      'Aman el crecimiento, y fluyen con él. Apolo se construyó para personas como tú.',
    ],
  },
}

export function OutlookMessage({ variant = 'incertidumbre' }) {
  const navigate = useNavigate()
  const message = MESSAGES[variant]

  return (
    <FlowShell>
      <div className="msg">
        <h1 className="msg__title">{message.title}</h1>

        {message.body.map((para, i) => (
          <p className="msg__para" key={i}>
            {Array.isArray(para) ? (
              <>
                {para[0]}
                <strong>{para[1]}</strong>
                {para[2]}
              </>
            ) : (
              para
            )}
          </p>
        ))}

        <button
          className="flow__cta"
          type="button"
          onClick={() => navigate('/registro/completar')}
        >
          Siguiente
        </button>
      </div>
    </FlowShell>
  )
}

/* ---------------- Completa tu registro (pages 84–85) ---------------- */

export function CompletaRegistro() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [phone, setPhone] = useState('')
  const [title, setTitle] = useState(null)
  const [reveal, setReveal] = useState({ password: false, confirm: false })

  const ready = password && confirm && phone && title

  const PasswordField = ({ id, label, value, onChange, shown, toggle }) => (
    <div className="rfield">
      <label className="rfield__label" htmlFor={id}>
        {label}
      </label>
      <div className="rfield__wrap">
        <input
          id={id}
          className="rfield__input"
          type={shown ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          className="rfield__eye"
          type="button"
          onClick={toggle}
          aria-label={shown ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          <Icon name={shown ? 'visibility_off' : 'visibility'} />
        </button>
      </div>
    </div>
  )

  return (
    <FlowShell lead={<RoundButton icon="close" label="Cerrar" onClick={() => navigate(-1)} />}>
      <div className="registro">
        <h1 className="registro__title">Completa tu registro</h1>

        <PasswordField
          id="password"
          label="Establece una contraseña"
          value={password}
          onChange={setPassword}
          shown={reveal.password}
          toggle={() => setReveal((r) => ({ ...r, password: !r.password }))}
        />
        <PasswordField
          id="confirm"
          label="Confirma tu contraseña"
          value={confirm}
          onChange={setConfirm}
          shown={reveal.confirm}
          toggle={() => setReveal((r) => ({ ...r, confirm: !r.confirm }))}
        />

        <div className="rfield">
          <label className="rfield__label" htmlFor="phone">
            Tu número de celular
          </label>
          <p className="rfield__hint">Lo usaremos si olvidas tu contraseña.</p>
          <div className="rfield__wrap rfield__wrap--prefix">
            <span className="rfield__prefix">
              <Icon name="arrow_drop_down" />
            </span>
            <input
              id="phone"
              className="rfield__input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <p className="registro__question">¿Cómo deberíamos referirnos a ti?</p>
        <div className="registro__choice">
          {['Doctor', 'Doctora'].map((option) => (
            <button
              key={option}
              type="button"
              className={`choice__btn${title === option ? ' is-active' : ''}`}
              onClick={() => setTitle(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className={`registro__submit${ready ? '' : ' is-idle'}`}
          type="button"
          onClick={() => navigate('/registro/verificacion')}
        >
          Continuar
        </button>
      </div>
    </FlowShell>
  )
}

/* ---------------- Verificación de identidad (pages 86–88) ---------------- */

export function VerificacionFoto() {
  const navigate = useNavigate()
  const [captured, setCaptured] = useState(false)

  return (
    <FlowShell
      lead={<RoundButton icon="arrow_back" label="Volver" onClick={() => navigate(-1)} />}
    >
      <div className="verify">
        <h1 className="verify__title">
          <span className="verify__accent">Siempre</span> evitaremos que alguien se haga pasar
          por ti.
        </h1>
        <p className="verify__lead">
          Para confirmar que eres tú, por favor toma una foto con la cámara de tu computadora
          donde podamos ver tu cara junto a tu documento de identidad.
        </p>

        <button
          className={`verify__frame${captured ? ' is-captured' : ''}`}
          type="button"
          onClick={() => setCaptured(true)}
        >
          {!captured && (
            <span className="verify__hint">
              <Icon name="photo_camera" />
              Haz click para tomar la foto
            </span>
          )}
        </button>

        <button
          className={`registro__submit verify__submit${captured ? '' : ' is-idle'}`}
          type="button"
          onClick={() => navigate('/registro/revision')}
        >
          Enviar foto
        </button>
      </div>
    </FlowShell>
  )
}

/* ---------------- Revisión de la foto (page 89) ---------------- */

export function FotoRevision() {
  const navigate = useNavigate()

  return (
    <FlowShell>
      <div className="revision">
        <p className="revision__text">
          Revisaremos la foto que enviaste, si hay problemas de verificación te contactaremos
          para coordinar una llamada antes de suspender tu cuenta.
        </p>

        <div className="revision__actions">
          <button
            className="revision__btn"
            type="button"
            onClick={() => navigate('/registro/verificacion')}
          >
            Tomar otra foto
          </button>
          <button
            className="revision__btn revision__btn--primary"
            type="button"
            onClick={() => navigate('/registro/bienvenida')}
          >
            Avanzar
          </button>
        </div>
      </div>
    </FlowShell>
  )
}

/* ---------------- Bienvenida (page 90) ---------------- */

export function Bienvenida() {
  const navigate = useNavigate()

  return (
    <div className="welcome">
      <h1 className="welcome__title">Bienvenida al futuro de la medicina privada</h1>
      <button className="welcome__cta" type="button" onClick={() => navigate('/')}>
        Iniciar Apolo
      </button>
    </div>
  )
}
