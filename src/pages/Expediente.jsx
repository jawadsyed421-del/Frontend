import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import Topbar from '../components/Topbar'
import Avatar from '../components/Avatar'
import ConsultationBar from '../components/ConsultationBar'
import { PATIENT } from '../data/patient'
import './Expediente.css'

const RAIL = [
  { to: '/expediente', icon: 'person', label: 'Información del paciente', end: true },
  { to: '/expediente/laboratorio', icon: 'science', label: 'Laboratorio' },
  { to: '/expediente/signos-vitales', icon: 'monitor_heart', label: 'Récord de signos vitales' },
  { to: '/expediente/notas', icon: 'description', label: 'Notas de evolución' },
  { to: '/expediente/historial-citas', icon: 'history', label: 'Historial de citas' },
]

const TABS = [
  { id: 'datos-personales', icon: 'person', label: 'Datos personales' },
  { id: 'historia-clinica', icon: 'clinical_notes', label: 'Historia clínica' },
  { id: 'prescripcion-medica', icon: 'medication', label: 'Prescripción médica' },
  { id: 'comentarios', icon: 'chat', label: 'Comentarios' },
  { id: 'contactos-emergencia', icon: 'emergency', label: 'Contactos de emergencia' },
]

const ANTECEDENTES = [
  { title: 'Antecedentes Personales Patológicos', meta: 'Editado por última vez: Setiembre 24, 2021' },
  { title: 'Antecedentes Personales No Patológicos', meta: 'Editado por última vez: -' },
  { title: 'Antecedentes Quirúrgicos', meta: 'Editado por última vez: Enero 15, 2022' },
  { title: 'Antecedentes Heredofamiliares', meta: 'Editado por última vez: Enero 15, 2022' },
  {
    title: 'Antecedentes Ginecobstétricos',
    meta: 'No aplica según el género del paciente.',
    action: 'Habilitar',
  },
  { title: 'Antecedentes Perinatales', meta: 'Editado por última vez: Enero 15, 2022' },
]

const APPOINTMENTS = [
  ['17 de agosto, 2022', '#0076ff', '11:15 am - 12:45 pm', 'laptop', 'Teleconsulta', false],
  ['2 de junio, 2022', '#f5362c', '1:00 pm - 2:15 pm', 'home', 'Visita a domicilio', true],
  ['9 de abril, 2022', '#9333ea', '4:45 pm - 5:15 pm', 'place', 'Cita en consultorio', true],
  ['15 de febrero, 2022', '#5b4cf0', '1:00 pm - 2:15 pm', 'home', 'Visita a domicilio', true],
  ['3 de enero, 2022', '#7c4df0', '5:00 pm - 5:45 pm', 'place', 'Cita en consultorio', true],
  ['21 de noviembre, 2021', '#7c4df0', '5:00 pm - 5:45 pm', 'home', 'Visita a domicilio', true],
  ['6 de agosto, 2021', '#22c38a', '5:30 pm - 6:15 pm', 'place', 'Cita en consultorio', true],
  ['30 de junio, 2021', '#7c4df0', '5:30 pm - 6:15 pm', 'home', 'Visita a domicilio', true],
  ['4 de mayo, 2021', '#f58aa8', '9:00 am - 10:00 am', 'place', 'Cita en consultorio', true],
  ['7 de marzo, 2021', '#f58aa8', '1:00 pm - 2:15 pm', 'home', 'Visita a domicilio', true],
  ['23 de enero, 2021', '#f58aa8', '4:45 pm - 5:15 pm', 'place', 'Cita en consultorio', true],
]

function PatientHeader({ centered = false }) {
  if (centered) {
    return (
      <div className="exp-hero">
        <Avatar size={84} empty />
        <h1 className="exp-hero__name">{PATIENT.name}</h1>
      </div>
    )
  }
  return (
    <div className="exp-head">
      <Avatar size={84} empty />
      <div>
        <h1 className="exp-head__name">{PATIENT.name}</h1>
        <p className="exp-head__row">
          <Icon name="badge" /> {PATIENT.document}
        </p>
        <p className="exp-head__row">
          <Icon name="mail" /> {PATIENT.email}
        </p>
        <p className="exp-head__row">
          <Icon name="call" /> {PATIENT.phone}
        </p>
      </div>
    </div>
  )
}

function DatosPersonales() {
  return (
    <>
      <PatientHeader centered />
      <div className="exp-cols">
        <section className="exp-card">
          <h2 className="exp-card__title">
            <Icon name="person" /> Datos personales
          </h2>
          <p className="exp-card__row">
            <Icon name="badge" /> 116690919
          </p>
          <p className="exp-card__row">
            <Icon name="cake" /> 29 de diciembre de 1971
          </p>
          <p className="exp-card__row">
            <Icon name="accessibility" /> 51 años
          </p>
          <p className="exp-card__row">
            <Icon name="male" /> Masculino
          </p>
          <p className="exp-card__row">
            <Icon name="work" /> Software Engineer
          </p>
          <p className="exp-card__row">
            <Icon name="favorite" /> Soltero
          </p>
          <p className="exp-card__row">
            <Icon name="group" />
            <span>
              Mamá. Alonsa María Jiménez
              <br />
              <span className="exp-card__sub">Tel: 8884 0914</span>
            </span>
          </p>
          <button className="exp-card__edit" type="button">
            <Icon name="edit" /> Editar información
          </button>
        </section>

        <section className="exp-card">
          <h2 className="exp-card__title">
            <Icon name="contacts" /> Información de contacto
          </h2>
          <p className="exp-card__row">
            <Icon name="mail" /> albertguardia77@hotmail.com
          </p>
          <p className="exp-card__row">
            <Icon name="call" /> +49 (89) 343 80 14
          </p>
          <p className="exp-card__row">
            <Icon name="home" />
            <span>
              Alajuela, Palmares centro, condominio Las Palmas, Casa de 7 plantas número 73-D
              color turquesa, entrada de adoquín con jardín grande.
            </span>
          </p>
          <button className="exp-card__edit" type="button">
            <Icon name="edit" /> Editar información
          </button>
        </section>
      </div>
    </>
  )
}

function HistoriaClinica() {
  const [selected, setSelected] = useState(1)

  return (
    <>
      <PatientHeader />

      <section className="exp-section">
        <h2 className="exp-section__title">
          <span className="exp-section__icon">🔍</span> Antecedentes
        </h2>

        <div className="antecedentes">
          <ul className="antecedentes__list">
            {ANTECEDENTES.map((item, i) => (
              <li key={item.title}>
                <button
                  type="button"
                  className={`antecedente${selected === i ? ' is-active' : ''}`}
                  onClick={() => setSelected(i)}
                >
                  <span>
                    <span className="antecedente__title">{item.title}</span>
                    <span className="antecedente__meta">
                      {item.meta}
                      {item.action && <a href="#habilitar"> {item.action}</a>}
                    </span>
                  </span>
                  {selected === i && <Icon name="edit" className="antecedente__edit" />}
                </button>
              </li>
            ))}
          </ul>

          <div className="antecedentes__panel">
            Hallazgos relacionados al fenómeno de raynaud.
          </div>
        </div>
      </section>

      <section className="exp-section">
        <h2 className="exp-section__title">
          <span className="exp-section__icon exp-section__icon--pink">
            <Icon name="favorite" />
          </span>
          Ficha médica
          <button className="exp-chip" type="button">
            Editar
          </button>
        </h2>

        <div className="stat-cards">
          <div className="stat-card">
            <p className="stat-card__label">
              <Icon name="straighten" /> Estatura
            </p>
            <p className="stat-card__value">185 cm</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">
              <Icon name="monitor_weight" /> Peso
            </p>
            <p className="stat-card__value">92 kg</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">
              <Icon name="water_drop" /> Grupo sanguíneo
            </p>
            <p className="stat-card__value">O -</p>
          </div>
          <div className="stat-card stat-card--wide">
            <p className="stat-card__label">
              <Icon name="e911_emergency" /> Alergias
            </p>
            <p className="stat-card__text">Aspirina, AINES, Mariscos, Tramadol.</p>
          </div>
        </div>

        <div className="stat-card stat-card--block">
          <p className="stat-card__label">
            <Icon name="article" /> Padecimiento actual
          </p>
          <p className="stat-card__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      <section className="exp-section">
        <h2 className="exp-section__title">
          <span className="exp-section__icon">🗂</span> Estudios de gabinete
          <button className="exp-chip" type="button">
            Adjuntar nuevo archivo
          </button>
        </h2>

        <div className="estudios">
          {['Ultrasonido Dopler', 'Rayos X', 'Electroencefalograma'].map((name) => (
            <figure className="estudio" key={name}>
              <div className="estudio__thumb" />
              <figcaption className="estudio__name">{name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}

function HistorialCitas() {
  return (
    <>
      <PatientHeader />

      <section className="exp-section">
        <h2 className="exp-section__title">
          <Icon name="history" className="exp-section__glyph" /> Historial de citas
        </h2>

        <div className="citas">
          <table className="citas__table">
            <thead>
              <tr>
                <th>Fecha de cita</th>
                <th>Hora en agenda</th>
                <th>Tipo de servicio</th>
                <th>Status</th>
                <th>Ampliar detalles</th>
              </tr>
            </thead>
            <tbody>
              {APPOINTMENTS.map(([date, color, time, icon, service, attended]) => (
                <tr key={`${date}-${time}`}>
                  <td>{date}</td>
                  <td>
                    <span className="citas__swatch" style={{ background: color }} />
                    {time}
                  </td>
                  <td>
                    <Icon name={icon} className="citas__icon" /> {service}
                  </td>
                  <td>
                    <span
                      className="citas__dot"
                      style={{ background: attended ? '#22c38a' : '#f5366f' }}
                    />
                    {attended ? 'Asistió a la cita' : 'No se presentó'}
                  </td>
                  <td>
                    <button className="citas__btn" type="button">
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="citas__end">Llegaste al final del historial.</p>
        </div>
      </section>
    </>
  )
}

export default function Expediente() {
  const navigate = useNavigate()
  const { section } = useParams()
  const isCitas = section === 'historial-citas'
  const [tab, setTab] = useState(
    TABS.some((t) => t.id === section) ? section : 'datos-personales'
  )

  return (
    <div className="shell">
      <Topbar />

      <div className="shell__body">
        <nav className="exp-rail" aria-label="Secciones del expediente">
          <ul>
            {RAIL.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `exp-rail__item${isActive ? ' is-active' : ''}`}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="exp-rail__actions">
            <button className="exp-rail__back" type="button" onClick={() => navigate(-1)}>
              <Icon name="arrow_back" /> Ir atrás
            </button>
            <button className="exp-rail__cta" type="button">
              Programar una cita
            </button>
          </div>
        </nav>

        <main className="exp-main">
          {!isCitas && (
            <div className="exp-tabs" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  className={`exp-tab${tab === t.id ? ' is-active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  <Icon name={t.icon} />
                  {t.label}
                </button>
              ))}
            </div>
          )}

          <div className="exp-body">
            {isCitas ? (
              <HistorialCitas />
            ) : tab === 'historia-clinica' ? (
              <HistoriaClinica />
            ) : (
              <DatosPersonales />
            )}
          </div>
        </main>
      </div>

      <ConsultationBar back onBack={() => navigate('/consulta')} onFinish={() => navigate('/')} />
    </div>
  )
}
