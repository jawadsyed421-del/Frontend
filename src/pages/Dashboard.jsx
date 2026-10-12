import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Avatar from '../components/Avatar'
import AppointmentToast from '../components/AppointmentToast'
import SkipAppointmentModal from '../components/SkipAppointmentModal'
import './Dashboard.css'

const APPOINTMENTS = [
  { name: 'Carolina Méndez Picado', date: 'Marzo 15, 2021', time: '3:00 PM', avatar: true },
  { name: 'Juan López Torrejón', date: 'Marzo 15, 2021', time: '3:45 PM', avatar: true },
  {
    name: 'Emilio Rafael Alberto Vallamorón Rodrí..',
    date: 'Marzo 15, 2021',
    time: '4:00 PM',
    avatar: false,
  },
]

const SUGGESTIONS = [
  'Incentiva a tus pacientes a recomendar tu perfil',
  'Publica contenido de valor en ApoloBlog',
  'Completa toda la información de tu perfil',
]

const GIFTS = [
  { title: 'Consulta con plan nutricional 2x1', meta: 'Se publicó el 25 de marzo, 2021' },
  { title: 'Consulta médica', meta: 'Se publicó el 25 de marzo, 2021' },
]

function StatRing({ value, caption }) {
  return (
    <div className="stat">
      <div className="stat__ring">
        <span className="stat__value">{value}</span>
      </div>
      <p className="stat__caption">{caption}</p>
    </div>
  )
}

export default function Dashboard() {
  const [showToast, setShowToast] = useState(true)
  const [showSkipModal, setShowSkipModal] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="shell">
      <Topbar />

      <div className="shell__body">
        <Sidebar />

        <main className="shell__main dashboard">
          <h1 className="dashboard__greeting">Bienvenido, Dr. Andrés Flores</h1>

          <div className="dashboard__grid">
            {/* ---- Próximas citas ---- */}
            <section className="card appointments">
              <h2 className="card-title">Próximas citas</h2>

              <ul className="appointments__list">
                {APPOINTMENTS.map((item) => (
                  <li className="appointment" key={item.name}>
                    {item.avatar ? <Avatar /> : <span className="appointment__spacer" />}
                    <div>
                      <p className="appointment__name">{item.name}</p>
                      <p className="appointment__meta">
                        {item.date} &nbsp;-&nbsp; {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="appointments__actions">
                <button className="btn btn--primary appointments__create" type="button">
                  <Icon name="add" />
                  Crear nueva cita
                </button>
                <button className="btn btn--ghost" type="button">
                  Ver más
                  <Icon name="arrow_forward" />
                </button>
              </div>
            </section>

            {/* ---- Estadísticas ---- */}
            <section className="card stats">
              <div className="stats__left">
                <h2 className="card-title">Estadísticas</h2>

                <div className="stats__rings">
                  <StatRing value="1,104" caption={'Visitas al perfil en el\núltimo mes'} />
                  <span className="stats__divider" />
                  <StatRing value="1" caption={'Pacientes que te\nhan recomendado'} />
                </div>
              </div>

              <div className="stats__right">
                <p className="stats__lead">
                  Sugerencias prácticas para aumentar las visitas y mejorar tu reputación en
                  Apolo.
                </p>
                <ul className="suggestions">
                  {SUGGESTIONS.map((text) => (
                    <li className="suggestion" key={text}>
                      <Icon name="arrow_upward" className="suggestion__icon" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="btn btn--soft stats__cta" type="button">
                Ver detalles de estadísticas
              </button>
            </section>

            {/* ---- Obsequios en circulación ---- */}
            <section className="card gifts">
              <h2 className="card-title">Obsequios en circulación</h2>

              <ul className="gifts__list">
                {GIFTS.map((gift) => (
                  <li className="gift" key={gift.title}>
                    <span className="gift__dot" aria-hidden="true" />
                    <div>
                      <p className="gift__title">{gift.title}</p>
                      <p className="gift__meta">{gift.meta}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="gifts__actions">
                <button className="btn btn--primary" type="button">
                  <Icon name="add" />
                  Crear obsequio
                </button>
                <button className="btn btn--ghost" type="button">
                  Ver más
                  <Icon name="arrow_forward" />
                </button>
              </div>
            </section>

            {/* ---- Mi cuaderno de notas ---- */}
            <section className="card notes">
              <h2 className="card-title">Mi cuaderno de notas</h2>

              <div className="notes__grid">
                <article className="note">
                  <h3 className="note__title">Sin Título</h3>
                  <p className="note__body">
                    Revisar la agenda del jueves 13 para sacar medio día y atender pendientes
                    del caso de Carolina. Ya no debo visitar la clínica de Sopó más que una
                    vez por semana.
                  </p>
                </article>

                <article className="note">
                  <h3 className="note__title">
                    Enlaces que debo visitar en los próximos 14 días para e...
                  </h3>
                  <p className="note__label">Enlaces pendientes</p>
                  <ul className="note__links">
                    <li>
                      <a href="https://uxplanet.org" target="_blank" rel="noreferrer">
                        https://uxplanet.org/the-only-figma-plugins-you-need-for-...
                      </a>
                    </li>
                  </ul>
                </article>
              </div>

              <button className="btn btn--primary notes__new" type="button">
                <Icon name="edit" />
                Nueva nota
              </button>
            </section>
          </div>
        </main>
      </div>

      {showToast && (
        <AppointmentToast
          name="Alberto Alfonso Guardia Solórzano"
          minutes="3:30"
          onStart={() => navigate('/consulta/preparando')}
          onSkip={() => setShowSkipModal(true)}
        />
      )}

      {showSkipModal && (
        <SkipAppointmentModal
          onClose={() => setShowSkipModal(false)}
          onConfirm={() => {
            setShowSkipModal(false)
            setShowToast(false)
          }}
        />
      )}
    </div>
  )
}
