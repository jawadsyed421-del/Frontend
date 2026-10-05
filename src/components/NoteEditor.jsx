import { useEffect } from 'react'
import Icon from './Icon'
import './NoteEditor.css'

const TOOLS = [
  ['format_bold', 'Negrita'],
  ['format_italic', 'Cursiva'],
  ['format_underlined', 'Subrayado'],
  ['strikethrough_s', 'Tachado'],
]

const BLOCK_TOOLS = [
  ['format_list_numbered', 'Lista numerada'],
  ['format_list_bulleted', 'Lista con viñetas'],
  ['format_align_left', 'Alineación'],
]

const INSERT_TOOLS = [
  ['link', 'Insertar enlace'],
  ['grid_on', 'Insertar tabla'],
  ['image', 'Insertar imagen'],
  ['print', 'Imprimir'],
]

/** Full-screen note composer (PDF page 153). */
export default function NoteEditor({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="ned-scrim" onMouseDown={onClose}>
      <div
        className="ned"
        role="dialog"
        aria-modal="true"
        aria-label="Nueva nota"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="ned__head">
          <h2 className="ned__title">Nueva nota</h2>
          <div className="ned__head-actions">
            <button className="ned__discard" type="button" onClick={onClose}>
              Descartar
            </button>
            <button className="ned__save" type="button" onClick={onClose}>
              Guardar nota
            </button>
          </div>
        </header>

        <div className="ned__toolbar">
          <button type="button" aria-label="Deshacer" disabled>
            <Icon name="undo" />
          </button>
          <button type="button" aria-label="Rehacer" disabled>
            <Icon name="redo" />
          </button>

          <span className="ned__sep" />
          <button className="ned__select" type="button">
            Texto normal <Icon name="expand_more" />
          </button>
          <span className="ned__sep" />
          <button className="ned__select" type="button">
            Segoe UI <Icon name="expand_more" />
          </button>
          <span className="ned__sep" />
          <button className="ned__select" type="button">
            10 pt <Icon name="expand_more" />
          </button>
          <span className="ned__sep" />

          <button className="ned__color" type="button" aria-label="Color de texto">
            <span className="ned__glyph">A</span>
            <span className="ned__swatch" />
            <Icon name="expand_more" />
          </button>

          {TOOLS.map(([icon, label]) => (
            <button key={icon} type="button" aria-label={label}>
              <Icon name={icon} />
            </button>
          ))}

          <button className="ned__color" type="button" aria-label="Color de resaltado">
            <Icon name="border_color" />
            <span className="ned__swatch" />
            <Icon name="expand_more" />
          </button>

          <span className="ned__sep" />
          {BLOCK_TOOLS.map(([icon, label]) => (
            <button key={icon} type="button" aria-label={label}>
              <Icon name={icon} />
            </button>
          ))}
          <span className="ned__sep" />
          {INSERT_TOOLS.map(([icon, label]) => (
            <button key={icon} type="button" aria-label={label}>
              <Icon name={icon} />
            </button>
          ))}
        </div>

        <div className="ned__sheet">
          <input className="ned__input-title" placeholder="Título" autoFocus />
          <textarea
            className="ned__input-body"
            placeholder="Comienza a escribir el contenido de tu nota aquí"
          />
        </div>
      </div>
    </div>
  )
}
