import { useEffect, useState } from "react";

const isDark = localStorage.getItem('darkTheme') === 'true'

export const useDarkMode = () => {
  const [active, setActive] = useState(isDark)

  useEffect(() => {
    if (active) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
    localStorage.setItem('darkTheme', String(active))
  }, [active])

  const toggle = () => setActive((prev) => !prev)

  return { toggle, active, setActive }
}
