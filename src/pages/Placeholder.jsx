import AppShell from '../components/AppShell'

/**
 * The sources only cover the screens wired in App.jsx, so the remaining nav
 * destinations render a neutral stub rather than a dead link.
 */
export default function Placeholder({ title }) {
  return (
    <AppShell>
      <h1 className="placeholder__title">{title}</h1>
    </AppShell>
  )
}
