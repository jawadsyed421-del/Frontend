import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

/* On phones the left navigation leaves the flow and becomes a slide-in drawer.
   The button that opens it lives in the Topbar, while the nav it opens is a
   sibling further down the tree — and not every screen has one (the
   consultation module has no nav at all). So the open state lives in a
   context, and a nav registers itself on mount; the Topbar only grows a menu
   button once something is actually there to open. */

const FALLBACK = {
  open: false,
  setOpen: () => {},
  hasNav: false,
  registerNav: () => () => {},
}

const NavContext = createContext(FALLBACK)

export function NavProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [navCount, setNavCount] = useState(0)

  const registerNav = useCallback(() => {
    setNavCount((n) => n + 1)
    return () => setNavCount((n) => n - 1)
  }, [])

  // Escape closes the drawer, and while it is open the page behind it holds still.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [open])

  const value = useMemo(
    () => ({ open, setOpen, hasNav: navCount > 0, registerNav }),
    [open, navCount, registerNav]
  )

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}

export function useNav() {
  return useContext(NavContext)
}

/** Declares "this screen has a navigation the drawer button should open." */
export function useRegisterNav() {
  const { registerNav } = useNav()
  useEffect(() => registerNav(), [registerNav])
}
