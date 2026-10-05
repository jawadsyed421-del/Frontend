export const HOURS = [
  '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM',
  '11 AM', '12 M', '1 M', '2 M', '3 M', '4 M', '5 M', '6 M', '7 M', '8 M', '9 M', '10 M',
  '11 M',
]

export const WEEKDAYS_LONG = [
  'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO',
]
export const WEEKDAYS_SHORT = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM']
export const WEEKDAY_INITIALS = ['L', 'M', 'K', 'J', 'V', 'S', 'D']

export const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre',
  'Octubre', 'Noviembre', 'Diciembre',
]

/** Appointments on Miércoles 21 de abril de 2021 (PDF pages 94–124). */
export const DAY_EVENTS = [
  {
    id: 'liseth',
    patient: 'Liseth Robledo Mungía',
    docId: '108690929',
    kind: 'Teleconsulta',
    time: '8:00 - 8:45 am',
    start: 8,
    end: 8.75,
    lane: 0,
    lanes: 3,
    color: '#f03a17',
  },
  {
    id: 'jonathan',
    patient: 'Jonathan Zárate Muñoz',
    docId: '311290978',
    kind: 'Cita en consultorio',
    time: '8:00 - 8:45 am',
    start: 8,
    end: 8.75,
    lane: 1,
    lanes: 3,
    color: '#d6281f',
  },
  {
    id: 'juan',
    patient: 'Juan Manuel Alberto Fernández Rodríguez',
    docId: '111290816',
    kind: 'Cita en consultorio',
    time: '8:00 - 8:45 am',
    start: 8,
    end: 8.75,
    lane: 2,
    lanes: 3,
    color: '#0a6ae8',
  },
  {
    id: 'roberto',
    patient: 'Roberto Mejía Murillo',
    docId: '708632941',
    kind: 'Consulta domiciliar',
    time: '8:45 - 9:30 am',
    start: 8.75,
    end: 9.5,
    lane: 0,
    lanes: 3,
    color: '#8e2bbd',
  },
  {
    id: 'rigoberto',
    patient: 'Rigoberto Maximiliano Rodríguez Villalobos',
    docId: '506632912',
    kind: 'Consulta domiciliar',
    time: '8:45 - 9:30 am',
    start: 8.75,
    end: 9.5,
    lane: 1,
    lanes: 3,
    span: 2,
    color: '#e0a713',
  },
]

/** Side-panel content for the Rigoberto appointment (PDF pages 100–118). */
export const EVENT_DETAILS = {
  patient: 'Rigoberto Maximiliano Rodríguez Villalobos',
  docId: '506632912',
  rows: [
    ['calendar_today', 'Miércoles 21 de abril de 2021'],
    ['schedule', '11:30 AM - 12:15 PM'],
    ['home', 'Consulta domiciliar.', 'Ver ubicación'],
    ['notifications', '30 minutos antes'],
    ['chat_bubble', 'Por favor recuerda tener los resultados del examen de sangre.'],
    ['swatch', 'Girasol'],
    ['change_history', 'Se agendó desde tu gestor de Apolo el día 12/02/2021'],
  ],
}

/** Week of 19–25 April 2021 (PDF pages 125–129). */
export const WEEK_EVENTS = [
  { id: 'w1', day: 0, start: 5, end: 5.75, title: 'Liseth Robledo Mungía', time: '5:00 - 5:45 am', color: '#f03a17' },
  { id: 'w2', day: 0, start: 5.75, end: 6.5, title: 'Diana María García Pineda', time: '5:45 - 6:30 am', color: '#f03a17' },
  { id: 'w3', day: 0, start: 6.75, end: 7.5, title: 'Marco Aurelio Quirós Sana..', time: '6:45 - 7:30 am', color: '#f03a17' },
  { id: 'w4', day: 1, start: 5, end: 5.75, title: 'Roberto Mejía Murillo', time: '8:45 - 9:30 am', color: '#8e2bbd' },
  { id: 'w5', day: 1, start: 5.75, end: 6.5, title: 'Sam..', time: '8:45 -', color: '#9cc6fb', narrow: 0 },
  { id: 'w6', day: 1, start: 5.75, end: 6.5, title: 'Max..', time: '8:45 -', color: '#6f7cf5', narrow: 1 },
  { id: 'w7', day: 1, start: 5.75, end: 6.5, title: 'Jose..', time: '8:45 -', color: '#17a34a', narrow: 2 },
]

/** Month cells carry a repeating chip set in the prototype (PDF page 132). */
export const MONTH_CHIPS = [
  { time: '8 - 8:30 am', tone: 'red' },
  { time: '8:30 - 9:15 am', tone: 'blue' },
  { time: '9:15 - 10:00 am', tone: 'purple' },
  { time: '11:45 am - 12:45 pm', tone: 'pink' },
]

/** Which April days carry chips, and the "y N más.." overflow count. */
export const MONTH_LOAD = {
  1: 1, 6: 4, 8: 0, 12: 7, 13: 1, 14: 4, 15: 12, 16: 0, 17: 0, 18: 12, 30: 4,
}

/** First weekday (0 = Monday) and length for each 2021 month. */
export const YEAR_2021 = [
  [4, 31], [0, 28], [0, 31], [3, 30], [5, 31], [1, 30],
  [3, 31], [6, 31], [2, 30], [4, 31], [0, 30], [2, 31],
]
