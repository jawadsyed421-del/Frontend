import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Avatar from '../components/Avatar'
import './PacientesCalendar.css'

/** Search results for "Rigoberto" (PDF pages 141–142). */
const RESULTS = [
  ['Rigoberto Antonio Fernández Corrido', '116690919', '37 años', true],
  ['Rigoberto Ramírez Cascante', '117090981', '41 años', true],
  ['Rigoberto Francisco Sotela Ruiz', '326610967', '17 años', false],
  ['Rigoberto Aurelio Semilla Contreras', '736690984', null, false],
  ['Fausto Rigoberto Cascante Madriz', '101690935', '22 años', true],
  ['Ernesto Rigoberto Arroyo Fernández', '500490940', '62 años', false],
  ['Rigoberto Hernández Vargas', '500490940', '62 años', false],
  ['Fausto Rigoberto Cascante Madriz', '101690935', '22 años', false],
  ['Ernesto Rigoberto Arroyo Fernández', '500490940', '62 años', false],
  ['Rigoberto Hernández Vargas', '500490940', '62 años', false],
]

/** A single patient's appointments (PDF pages 145–148). */
const APPOINTMENTS = [
  {
    day: '13',
    today: true,
    date: 'Diciembre de 2022, jue.',
    color: '#f03a17',
    time: '1:00 pm - 2:15 pm',
    icon: 'home',
    service: 'Visita a domicilio',
    status: 'Cita próxima',
    tone: '#0076ff',
  },
  {
    day: '2',
    date: 'Noviembre de 2022, lun.',
    color: '#0a6ae8',
    time: '11:15 am - 12:45 pm',
    icon: 'laptop',
    service: 'Teleconsulta',
    status: 'Asistió a la cita',
    tone: '#22c38a',
  },
  {
    day: '29',
    date: 'Setiembre de 2022, lun.',
    color: '#8e2bbd',
    time: '4:45 pm - 5:15 pm',
    icon: 'place',
    service: 'Cita en consultorio',
    status: 'No se presentó',
    tone: '#f5366f',
  },
]

function SearchBar({ value, onChange, onBack, centered = false }) {
  return (
    <header className={`pcal__bar${centered ? ' pcal__bar--centered' : ''}`}>
      <div className="pcal__lead">
        <button className="pcal__back" type="button" onClick={onBack} aria-label="Volver">
          <Icon name="arrow_back" />
        </button>

        <label className="pcal__search">
          <Icon name="search" />
          <input value={value} onChange={(e) => onChange(e.target.value)} aria-label="Buscar" />
        </label>
      </div>

      <button className="pcal__add" type="button">
        Agregar una cita
      </button>
    </header>
  )
}

/** Patient search results list. */
export function PacientesBuscar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('Rigoberto')

  const visible = RESULTS.filter(([name]) =>
    name.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <div className="shell">
      <Topbar />
      <div className="shell__body">
        <Sidebar />

        <main className="pcal">
          <SearchBar value={query} onChange={setQuery} onBack={() => navigate(-1)} centered />

          <div className="pcal__body">
            <section className="pcard">
              <h1 className="pcard__title">Pacientes en ApoloCalendar</h1>

              <ul className="plist">
                {visible.map(([name, id, age, hasRecord], i) => (
                  <li className="plist__row" key={`${name}-${i}`}>
                    <Avatar size={44} />
                    <div className="plist__who">
                      <p className="plist__name">{name}</p>
                      <p className="plist__meta">
                        Identificación: {id}
                        {age && <> &nbsp;•&nbsp; {age}</>}
                      </p>
                    </div>
                    {hasRecord && (
                      <button className="plist__rec" type="button" aria-label="Abrir expediente">
                        <Icon name="folder_shared" />
                      </button>
                    )}
                  </li>
                ))}
                {visible.length === 0 && (
                  <li className="plist__none">No encontramos pacientes con ese nombre.</li>
                )}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

/** One patient's appointment history. */
export function PacienteCitas() {
  const navigate = useNavigate()

  return (
    <div className="shell">
      <Topbar />
      <div className="shell__body">
        <Sidebar />

        <main className="pcal">
          <SearchBar
            value="Rigoberto Alfonso Rodríguez Rojas"
            onChange={() => {}}
            onBack={() => navigate(-1)}
          />

          <table className="ptable">
            <thead>
              <tr>
                <th>Fecha de cita</th>
                <th>Hora en agenda</th>
                <th>Tipo de servicio</th>
                <th>Paciente</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {APPOINTMENTS.map((a) => (
                <tr key={a.date}>
                  <td>
                    <span className="ptable__date">
                      {a.today && <span className="ptable__today">HOY</span>}
                      <span className={`ptable__day${a.today ? ' is-today' : ''}`}>{a.day}</span>
                      <span className={`ptable__month${a.today ? ' is-today' : ''}`}>
                        {a.date}
                      </span>
                    </span>
                  </td>
                  <td>
                    <span className="ptable__swatch" style={{ background: a.color }} />
                    {a.time}
                  </td>
                  <td>
                    <Icon name={a.icon} className="ptable__icon" /> {a.service}
                  </td>
                  <td>Rigoberto Alfonso Rodríguez R..</td>
                  <td>
                    <span className="ptable__dot" style={{ background: a.tone }} />
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  )
}
