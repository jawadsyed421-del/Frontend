import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import Topbar from '../components/Topbar'
import PatientFichas from '../components/PatientFichas'
import ConsultationBar from '../components/ConsultationBar'
import Dialog from '../components/Dialog'
import { PATIENT } from '../data/patient'
import './ConsultationModule.css'

const VITALS = [
  { id: 'peso', label: 'Peso', unit: 'kg' },
  { id: 'pa', label: 'PA', unit: 'mmHg', split: true },
  { id: 'fc', label: 'FC', unit: 'lpm' },
  { id: 'sat', label: 'Sat O₂', unit: '%' },
  { id: 'temp', label: 'Temperatura', unit: '°C' },
]

const INITIAL_PRESCRIPTIONS = [
  {
    id: 'metmorfina',
    name: 'Metmorfina 500 mg',
    route: 'Administración oral',
    indications:
      'Consumir una tableta cada 12 horas de los primeros 15 días, en el día 16 aumentar a 2 tabletas cada 12 horas y permanecer así hasta la siguiente cita.',
    duration: 'Mantener tratamiento por 6 meses.',
    notes:
      'Suspender la medicación si experimenta síntomas de mareo, vómito, náuseas, diarrea, picazón o sarpullido en la piel.',
  },
  {
    id: 'losartan',
    name: 'Losartan 50 mg',
    route: 'Administración oral',
    indications: 'Consumir una tableta 1 tableta al día.',
    duration: 'Mantener tratamiento por 2 meses.',
  },
  {
    id: 'omeprazole',
    name: 'Omeprazole 20 mg',
    route: 'Administración sublingual',
    indications:
      'Consumir una tableta en la mañana y una durante la noche. Podría ser antes del desayuno y la cena.',
    duration: 'Mantener tratamiento por 1 año.',
  },
  {
    id: 'vitamina-d',
    name: 'Vitamina D 1000 UI',
    route: 'Administración intravenosa',
    indications: 'Administrar 1 inyección semanal.',
    duration: 'Mantener tratamiento por 8 semanas.',
  },
]

function Step({ title, description, children }) {
  return (
    <div className="step">
      <span className="step__marker" aria-hidden="true" />
      <div className="step__content">
        <h2 className="step__title">{title}</h2>
        {description && <p className="step__desc">{description}</p>}
        {children}
      </div>
    </div>
  )
}

function Radio({ name, label, checked, onChange }) {
  return (
    <label className={`radio radio--pill${checked ? ' is-checked' : ''}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span className="radio__dot" aria-hidden="true">
        <Icon name="check" />
      </span>
      <span className="radio__label">{label}</span>
    </label>
  )
}

function Prescription({ item, onDelete }) {
  return (
    <article className="rx">
      <h3 className="rx__name">{item.name}</h3>
      <p className="rx__route">{item.route}</p>
      <p className="rx__line">
        <strong>Indicaciones:</strong> {item.indications}
      </p>
      <p className="rx__line">
        <strong>Duración del tratamiento:</strong> {item.duration}
      </p>
      {item.notes && (
        <p className="rx__line">
          <strong>Observaciones adicionales:</strong> {item.notes}
        </p>
      )}

      <div className="rx__actions">
        <button className="rx__btn" type="button">
          <Icon name="edit" />
          Editar
        </button>
        <button className="rx__btn" type="button" onClick={() => onDelete(item)}>
          <Icon name="delete" />
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default function ConsultationModule({ requireRecord = false }) {
  const navigate = useNavigate()
  const [companion, setCompanion] = useState(null)
  const [companionName, setCompanionName] = useState('')
  const [prescriptions, setPrescriptions] = useState(INITIAL_PRESCRIPTIONS)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [files, setFiles] = useState([])
  const [needsRecord, setNeedsRecord] = useState(requireRecord)

  const addFile = () =>
    setFiles((current) => [
      ...current,
      { id: `f${current.length + 1}`, kind: 'pdf', name: 'Radiografía Rigobe…chia.pdf' },
    ])

  return (
    <div className="shell">
      <Topbar />

      <div className="consulta">
        <div className="consulta__form">
          <h1 className="consulta__title">Módulo de consulta médica</h1>

          <div className="steps">
            <Step title="¿El paciente viene acompañado?">
              <div className="step__options" role="radiogroup">
                <Radio
                  name="companion"
                  label="Sí, vino un acompañante"
                  checked={companion === 'yes'}
                  onChange={() => setCompanion('yes')}
                />
                {companion === 'yes' && (
                  <div className="field field--companion">
                    <label className="field__label" htmlFor="companion-name">
                      Nombre del acompañante
                    </label>
                    <input
                      id="companion-name"
                      className="field__input"
                      value={companionName}
                      onChange={(e) => setCompanionName(e.target.value)}
                      placeholder="Agregar nombre del acompañante"
                    />
                  </div>
                )}
                <Radio
                  name="companion"
                  label="No se presentó ningún acompañante"
                  checked={companion === 'no'}
                  onChange={() => setCompanion('no')}
                />
              </div>
            </Step>

            <Step title="Registro de signos vitales">
              <div className="vitals">
                {VITALS.map((v) => (
                  <div className="vital" key={v.id}>
                    <label className="vital__label" htmlFor={v.id}>
                      {v.label} <span className="vital__unit">{v.unit}</span>
                    </label>

                    {v.split ? (
                      <div className="vital__field vital__field--split">
                        <input id={v.id} className="vital__input" type="text" />
                        <span className="vital__slash">/</span>
                        <input className="vital__input" type="text" aria-label="PA diastólica" />
                      </div>
                    ) : (
                      <div className="vital__field">
                        <input id={v.id} className="vital__input" type="text" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Step>

            <Step title="Exploración física">
              <textarea className="step__textarea" placeholder="Escribe aquí..." />
            </Step>

            <Step title="Afección que suscribe el paciente (subjetivo)">
              <textarea className="step__textarea" placeholder="Escribe aquí..." />
            </Step>

            <Step title="Impresión diagnóstica (objetivo)">
              <textarea className="step__textarea" placeholder="Escribe aquí..." />
            </Step>

            <Step title="Prescripción médica">
              {prescriptions.length === 0 ? (
                <button
                  className="soft-btn soft-btn--inline"
                  type="button"
                  onClick={() => setPrescriptions(INITIAL_PRESCRIPTIONS)}
                >
                  Prescribir un medicamento
                </button>
              ) : (
                <div className="rx-list">
                  {prescriptions.map((item) => (
                    <Prescription key={item.id} item={item} onDelete={setPendingDelete} />
                  ))}
                  <button className="soft-btn soft-btn--block" type="button">
                    <Icon name="add_circle" />
                    Agregar otro medicamento
                  </button>
                </div>
              )}
            </Step>

            <Step
              title="Generar observaciones para el paciente"
              description="El paciente tendrá acceso permanente desde su teléfono a las anotaciones que ingreses en este campo. Este es un espacio para que puedas comunicar directamente a tu paciente los detalles o conclusiones más importantes de esta consulta médica."
            >
              <textarea className="step__textarea" placeholder="Escribe aquí..." />
            </Step>

            <Step
              title="Adjuntar archivos para el paciente"
              description="El paciente tendrá acceso permanente desde su teléfono a todos los archivos que adjuntes en este campo."
            >
              {files.length === 0 ? (
                <button className="dropzone" type="button" onClick={addFile}>
                  <Icon name="upload" className="dropzone__icon" />
                  <span>
                    Arrastra un archivo o haz click en este espacio para
                    <br />
                    buscar en tu computadora
                  </span>
                </button>
              ) : (
                <div className="files">
                  {files.map((f) => (
                    <div className="file" key={f.id}>
                      <span className="file__badge file__badge--pdf">PDF</span>
                      <span className="file__name">{f.name}</span>
                    </div>
                  ))}
                  <button className="file file--add" type="button" onClick={addFile}>
                    <Icon name="add" />
                  </button>
                </div>
              )}
            </Step>

            <Step
              title="Generar una nota privada"
              description="Estas notas son cifradas, solamente tú como médico propietario de la cuenta principal de Apolo, tienes acceso a lo que escribas dentro de este campo, nadie más, ni el paciente, ni los colaboradores de tu cuenta, incluso ni Apolo podría ver tus notas privadas de consulta."
            >
              <textarea className="step__textarea" placeholder="Escribe aquí..." />
            </Step>

            <Step title="Nota de evolución">
              <textarea className="step__textarea" placeholder="Escribe aquí..." />
            </Step>
          </div>
        </div>

        <PatientFichas
          patient={PATIENT}
          onOpenRecord={() => navigate('/expediente')}
          onOpenHistory={() => navigate('/expediente/historial-citas')}
        />
      </div>

      <ConsultationBar onFinish={() => navigate('/')} />

      {needsRecord && (
        <Dialog
          variant="panel"
          title="Antes de comenzar, vamos a crear el expediente digital del paciente"
          onClose={() => setNeedsRecord(false)}
          actions={null}
        >
          <p>
            No se podrá iniciar el módulo de consulta hasta que exista un expediente para
            guardar toda la información que almacenes durante esta cita médica.
          </p>
          <p>Así que comencemos ahora mismo.</p>

          <button
            className="dlg-btn dlg-btn--primary dlg-btn--block"
            type="button"
            onClick={() => navigate('/expediente/nuevo')}
          >
            Crear expediente digital
          </button>
          <button className="dlg-link" type="button" onClick={() => navigate('/')}>
            Terminar consulta médica
          </button>
        </Dialog>
      )}

      {pendingDelete && (
        <Dialog
          variant="confirm"
          title="Eliminar prescripción médica"
          onClose={() => setPendingDelete(null)}
          actions={
            <>
              <button
                className="dlg-btn dlg-btn--soft"
                type="button"
                onClick={() => setPendingDelete(null)}
              >
                Cancelar
              </button>
              <button
                className="dlg-btn dlg-btn--primary"
                type="button"
                onClick={() => {
                  setPrescriptions((list) => list.filter((p) => p.id !== pendingDelete.id))
                  setPendingDelete(null)
                }}
              >
                Continuar
              </button>
            </>
          }
        >
          Una vez que lo elimines no se podrá recuperar la información. ¿Seguro que deseas
          continuar?
        </Dialog>
      )}
    </div>
  )
}
