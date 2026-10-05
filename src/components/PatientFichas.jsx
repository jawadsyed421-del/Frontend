import { useState } from 'react'
import Icon from './Icon'
import Avatar from './Avatar'
import './PatientFichas.css'

const ANTECEDENTES = {
  APP: 'Hipertensión Arterial, RGE (Gastritis), Asma Bronquial, EPOC, signos de rinitis alérgica sin diagnóstico.',
  AHF: 'Madre con Diabetes Mellitus Tipo II, padre con Hipertensión Arterial.',
  AQX: 'Apendicectomía (2003), reparación de hernia inguinal derecha (2015).',
  APnP: 'Fumador social, consumo de alcohol ocasional, actividad física dos veces por semana.',
}

export default function PatientFichas({ patient, onOpenRecord, onOpenHistory }) {
  const [tab, setTab] = useState('APP')

  return (
    <aside className="fichas">
      <section>
        <h2 className="ficha__heading">
          <span className="ficha__badge">
            <Icon name="person" />
          </span>
          Ficha identificación del paciente
        </h2>

        <div className="ficha__card">
          <div className="ficha__patient">
            <Avatar size={56} />
            <div>
              <p className="ficha__name">{patient.name}</p>
              <button className="ficha__link" type="button" onClick={onOpenRecord}>
                Abrir expediente <Icon name="chevron_right" />
              </button>
            </div>
          </div>

          <p className="ficha__fact">Identificación: {patient.id}</p>
          {patient.facts.map((fact) => (
            <p className="ficha__fact" key={fact}>
              {fact}
            </p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="ficha__heading">
          <span className="ficha__badge">
            <Icon name="favorite" />
          </span>
          Ficha médica del paciente
        </h2>

        <div className="ficha__card">
          <p className="ficha__row">
            <strong>Estatura:</strong> {patient.height}
          </p>
          <p className="ficha__row">
            <strong>Peso:</strong> {patient.weight}
          </p>
          <p className="ficha__row">
            <strong>Grupo sanguíneo:</strong> {patient.bloodType}
          </p>
          <p className="ficha__row">
            <strong>Alergias:</strong> {patient.allergies}
          </p>
          <p className="ficha__row">
            <strong>Padecimiento actual:</strong> {patient.condition}
          </p>

          <div className="ficha__tabs" role="tablist">
            {Object.keys(ANTECEDENTES).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                className={`ficha__tab${tab === key ? ' is-active' : ''}`}
                onClick={() => setTab(key)}
              >
                {key}
              </button>
            ))}
          </div>

          <p className="ficha__antecedente">{ANTECEDENTES[tab]}</p>
        </div>

        <button className="ficha__history" type="button" onClick={onOpenHistory}>
          Ver historial de citas del paciente
        </button>
      </section>
    </aside>
  )
}
