import { createContext, FC } from "react";

import { useTabCategory } from "../hooks/useTabCategory";
import { useTabCount } from "../hooks/useTabCount";

type MenuTabContextType = {
  tabCategoryHook: ReturnType<typeof useTabCategory>
  tabCountHook: ReturnType<typeof useTabCount>
}

export const MenuTabContext = createContext<MenuTabContextType>(
  undefined as any
)

export const MenuTabContextProvider: FC = ({ children }) => {
  const tabCategoryHook = useTabCategory()
  const tabCountHook = useTabCount()

  return (
    <MenuTabContext.Provider value={{ tabCategoryHook, tabCountHook }}>
      {children}
    </MenuTabContext.Provider>
  )
}
