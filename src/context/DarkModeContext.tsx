import { createContext, FC } from "react";

import { useDarkMode } from "../hooks/useDarkMode";

type DarkModeContextType = {
  toggle: () => void
  active: boolean
}

export const DarkModeContext = createContext<DarkModeContextType>(
  undefined as any
)

export const DarkModeContextProvider: FC = ({ children }) => {
  const darkModeHook = useDarkMode()

  return (
    <DarkModeContext.Provider value={{ ...darkModeHook }}>
      {children}
    </DarkModeContext.Provider>
  )
}
