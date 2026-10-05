import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

/* Every screen but the landing dashboard is split into its own chunk, so the
   first paint only downloads the route the person actually opened. */
const ConsultationModule = lazy(() => import('./pages/ConsultationModule'))
const Expediente = lazy(() => import('./pages/Expediente'))
const CrearExpediente = lazy(() => import('./pages/CrearExpediente'))
const Calendar = lazy(() => import('./pages/Calendar'))
const Inicio = lazy(() => import('./pages/Inicio'))
const Placeholder = lazy(() => import('./pages/Placeholder'))

const loadInterstitials = () => import('./pages/ConsultationLoading')
const PreparingConsultation = lazy(() =>
  loadInterstitials().then((m) => ({ default: m.PreparingConsultation }))
)
const OpeningConsultation = lazy(() =>
  loadInterstitials().then((m) => ({ default: m.OpeningConsultation }))
)

const loadOnboarding = () => import('./pages/Onboarding')
const CodigoMedico = lazy(() => loadOnboarding().then((m) => ({ default: m.CodigoMedico })))
const CrearCuenta = lazy(() => loadOnboarding().then((m) => ({ default: m.CrearCuenta })))

const loadSteps = () => import('./pages/OnboardingSteps')
const OutlookMessage = lazy(() => loadSteps().then((m) => ({ default: m.OutlookMessage })))
const CompletaRegistro = lazy(() => loadSteps().then((m) => ({ default: m.CompletaRegistro })))
const VerificacionFoto = lazy(() => loadSteps().then((m) => ({ default: m.VerificacionFoto })))
const FotoRevision = lazy(() => loadSteps().then((m) => ({ default: m.FotoRevision })))
const Bienvenida = lazy(() => loadSteps().then((m) => ({ default: m.Bienvenida })))

const loadPacientes = () => import('./pages/PacientesCalendar')
const PacientesBuscar = lazy(() =>
  loadPacientes().then((m) => ({ default: m.PacientesBuscar }))
)
const PacienteCitas = lazy(() => loadPacientes().then((m) => ({ default: m.PacienteCitas })))

const PLACEHOLDERS = [
  ['/pacientes', 'Lista de pacientes'],
  ['/blog', 'ApoloBlog'],
  ['/obsequios', 'Obsequios'],
  ['/solicitudes', 'Solicitudes'],
  ['/comunicados', 'Comunicados oficiales'],
  ['/perfil', 'Mi perfil profesional'],
  ['/preferencias', 'Preferencias de cuenta'],
]

export default function App() {
  return (
    <Suspense fallback={<div className="route-fallback" aria-busy="true" />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* consulta médica (PDF 12–47, 56–60) */}
        <Route path="/consulta" element={<ConsultationModule />} />
        <Route path="/consulta/sin-expediente" element={<ConsultationModule requireRecord />} />
        <Route path="/consulta/preparando" element={<PreparingConsultation />} />
        <Route path="/consulta/abriendo" element={<OpeningConsultation />} />

        {/* expediente digital (PDF 48–55, 58–59) */}
        <Route path="/expediente" element={<Expediente />} />
        <Route path="/expediente/nuevo" element={<CrearExpediente />} />
        <Route path="/expediente/:section" element={<Expediente />} />

        {/* onboarding (PDF 61–90) */}
        <Route path="/registro/codigo" element={<CodigoMedico />} />
        <Route path="/registro/cuenta" element={<CrearCuenta />} />
        <Route
          path="/registro/incertidumbre"
          element={<OutlookMessage variant="incertidumbre" />}
        />
        <Route path="/registro/prosperidad" element={<OutlookMessage variant="prosperidad" />} />
        <Route path="/registro/completar" element={<CompletaRegistro />} />
        <Route path="/registro/verificacion" element={<VerificacionFoto />} />
        <Route path="/registro/revision" element={<FotoRevision />} />
        <Route path="/registro/bienvenida" element={<Bienvenida />} />

        {/* ApoloCalendar (PDF 91–148) */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/pacientes" element={<PacientesBuscar />} />
        <Route path="/calendar/paciente" element={<PacienteCitas />} />
        <Route path="/calendar/:view" element={<Calendar />} />

        {/* later dashboard (PDF 149–164) */}
        <Route path="/inicio" element={<Inicio />} />

        {PLACEHOLDERS.map(([path, title]) => (
          <Route key={path} path={path} element={<Placeholder title={title} />} />
        ))}
      </Routes>
    </Suspense>
  )
}
