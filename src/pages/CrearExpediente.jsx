import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import './CrearExpediente.css'

const STEPS = [
  { id: 'personal', label: 'Información\npersonal' },
  { id: 'clinica', label: 'Historia\nclínica', hint: '(opcional)' },
  { id: 'revisar', label: 'Revisar y\ncrear' },
]

export default function CrearExpediente() {
  const navigate = useNavigate()
  const [step] = useState('personal')
  const [gender, setGender] = useState(null)
  const [form, setForm] = useState({ doc: '', name: '', dob: '', email: '', phone: '', address: '' })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const complete = form.doc && form.name && gender && form.dob

  return (
    <div className="wizard">
      <header className="wizard__top">
        <button
          className="wizard__close"
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Cerrar"
        >
          <Icon name="close" />
        </button>
      </header>

      <div className="wizard__head">
        <h1 className="wizard__title">Crear un expediente digital</h1>

        <ol className="stepper">
          {STEPS.map((s, i) => (
            <li className="stepper__item" key={s.id}>
              {i > 0 && <span className="stepper__line" aria-hidden="true" />}
              <span className={`stepper__label${step === s.id ? ' is-active' : ''}`}>
                {s.label}
                {s.hint && <span className="stepper__hint">{s.hint}</span>}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="wizard__card">
        <section className="wizard__col">
          <h2 className="wizard__legend">
            <Icon name="person" /> Datos personales
          </h2>

          <label className="wfield">
            <span className="wfield__label">Número de documento de identificación</span>
            <input className="wfield__input" value={form.doc} onChange={set('doc')} />
          </label>

          <label className="wfield">
            <span className="wfield__label">Nombre y apellidos</span>
            <input className="wfield__input" value={form.name} onChange={set('name')} />
          </label>

          <div className="wfield">
            <span className="wfield__label">Género</span>
            <div className="gender">
              {[
                ['Masculino', 'male'],
                ['Femenino', 'female'],
              ].map(([label, icon]) => (
                <button
                  key={label}
                  type="button"
                  className={`gender__btn${gender === label ? ' is-active' : ''}`}
                  onClick={() => setGender(label)}
                >
                  <Icon name={icon} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <label className="wfield">
            <span className="wfield__label">Fecha de nacimiento</span>
            <span className="wfield__wrap">
              <input className="wfield__input" value={form.dob} onChange={set('dob')} />
              <Icon name="chevron_right" className="wfield__affix" />
            </span>
          </label>
        </section>

        <span className="wizard__divider" aria-hidden="true" />

        <section className="wizard__col">
          <h2 className="wizard__legend">
            <Icon name="contacts" /> Información de contacto
          </h2>

          <label className="wfield">
            <span className="wfield__label">Correo electrónico</span>
            <input className="wfield__input" value={form.email} onChange={set('email')} />
          </label>

          <label className="wfield">
            <span className="wfield__label">Número de teléfono</span>
            <span className="wfield__wrap wfield__wrap--prefix">
              <span className="wfield__prefix">
                <Icon name="arrow_drop_down" />
              </span>
              <input className="wfield__input" value={form.phone} onChange={set('phone')} />
            </span>
          </label>

          <label className="wfield">
            <span className="wfield__label">Domicilio</span>
            <input className="wfield__input" value={form.address} onChange={set('address')} />
          </label>
        </section>
      </div>

      <div className="wizard__footer">
        <button className="wizard__next" type="button" disabled={!complete}>
          Siguiente
        </button>
      </div>
    </div>
  )
}
