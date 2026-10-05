import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell({ children, overlay }) {
  return (
    <div className="shell">
      <Topbar />
      <div className="shell__body">
        <Sidebar />
        <main className="shell__main">{children}</main>
      </div>
      {overlay}
    </div>
  )
}
