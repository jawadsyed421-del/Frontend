import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import Dialog from '../components/Dialog'
import './Onboarding.css'

function AuthShell({ children }) {
  return (
    <div className="auth">
      <header className="auth__top">
        <a className="auth__signin" href="#login">
          Iniciar sesión
        </a>
      </header>

      <main className="auth__main">{children}</main>

      <footer className="auth__foot">
        <p className="auth__copy">
          Copyright ©2021 Apolo Technologies LLC. Todos los derechos reservados
        </p>
        <nav className="auth__links">
          <a href="#info">Información</a>
          <span aria-hidden="true">|</span>
          <a href="#legal">Condiciones legales</a>
        </nav>
      </footer>
    </div>
  )
}

/* ---------------- Tu código de médico (pages 61–66) ---------------- */

export function CodigoMedico() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  const submit = () => {
    if (code.trim().length < 5) {
      setError(true)
      return
    }
    setError(false)
    navigate('/registro/cuenta')
  }

  return (
    <AuthShell>
      <div className="auth__block">
        <h1 className="auth__title">Tu código de médico</h1>
        <p className="auth__lead">
          Para iniciar con la creación de tu cuenta, por favor indícanos cuál es tu código de
          médico.
        </p>

        <div className={`code-field${error ? ' is-error' : ''}`}>
          <label className="code-field__label" htmlFor="med-code">
            Código de médico
          </label>
          <div className="code-field__row">
            <span className="code-field__prefix">MED -</span>
            <input
              id="med-code"
              className="code-field__input"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError(false)
              }}
            />
          </div>
        </div>

        {error && (
          <p className="auth__error">
            <Icon name="error" /> Ingresa un código válido
          </p>
        )}

        <button className="auth__submit" type="button" onClick={submit}>
          Avanzar
        </button>
      </div>
    </AuthShell>
  )
}

/* ---------------- Crea tu cuenta de Apolo (pages 67–73) ---------------- */

const TAKEN = 'clinicasanantonio@hotmail.com'

export function CrearCuenta() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [outlook, setOutlook] = useState(null)
  const [subscribe, setSubscribe] = useState(true)
  const [emailError, setEmailError] = useState('')
  const [showExisting, setShowExisting] = useState(false)

  const submit = () => {
    if (email.trim().toLowerCase() === TAKEN) {
      setShowExisting(true)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Parece que el formato no es válido. Prueba con otra dirección.')
      return
    }
    setEmailError('')
    navigate(outlook === 'Próspero' ? '/registro/prosperidad' : '/registro/incertidumbre')
  }

  const ready = email && name && outlook

  return (
    <AuthShell>
      <div className="signup">
        <h1 className="signup__title">Crea tu cuenta de Apolo</h1>

        <div className={`sfield${emailError ? ' is-error' : ''}`}>
          <label className="sfield__label" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            className="sfield__input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError('')
            }}
          />
          {emailError && (
            <p className="sfield__msg">
              <Icon name="warning" /> {emailError}
            </p>
          )}
        </div>

        <div className="sfield">
          <label className="sfield__label" htmlFor="name">
            Nombre completo
          </label>
          <input
            id="name"
            className="sfield__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <p className="signup__question">¿Cómo percibes tu futuro profesional?</p>
        <div className="choice">
          {['Próspero', 'Con incertidumbre'].map((option) => (
            <button
              key={option}
              type="button"
              className={`choice__btn${outlook === option ? ' is-active' : ''}`}
              onClick={() => setOutlook(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <label className="consent">
          <input
            type="checkbox"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
          />
          <span className="consent__box" aria-hidden="true">
            <Icon name="check" />
          </span>
          <span className="consent__text">
            Ocasionalmente enviamos correos sobre actualizaciones de productos, noticias,
            oportunidades importantes del sector o eventos que organizamos para la comunidad de
            médicos. Marca la casilla para que no te pierdas de nada, y si cambias de idea,
            puedes cancelar la suscripción en cualquier momento.{' '}
            <a href="#privacidad">Política de Privacidad</a>
          </span>
        </label>

        <button
          className={`signup__submit${ready ? '' : ' is-idle'}`}
          type="button"
          onClick={submit}
        >
          Continuar
        </button>
      </div>

      {showExisting && (
        <Dialog
          variant="panel"
          title="Identificamos una cuenta existente con el mismo correo electrónico"
          onClose={() => setShowExisting(false)}
          actions={
            <>
              <button
                className="dlg-btn dlg-btn--outline"
                type="button"
                onClick={() => setShowExisting(false)}
              >
                Probar con otro correo
              </button>
              <button className="dlg-btn dlg-btn--primary" type="button">
                Iniciar sesión
              </button>
            </>
          }
        >
          <p>
            Parece que ya existe una cuenta registrada en Apolo con el mismo correo electrónico,{' '}
            <strong>{TAKEN}.</strong>
          </p>
          <p>
            Inicia sesión para entrar al gestor principal y comenzar a utilizar todas las
            funciones que hemos construido para ti.
          </p>
        </Dialog>
      )}
    </AuthShell>
  )
}
