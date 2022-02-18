import { createContext, FC, useState } from "react";

import { DEFAULT_COUNTRY } from "../config/constants";

type CountryContextType = {
  country: string
  setCountry: (country: string) => void
}

export const CountryContext = createContext<CountryContextType>(
  undefined as any
)

const defaultCountry = localStorage.getItem('country') ?? DEFAULT_COUNTRY

export const CountryContextProvider: FC = ({ children }) => {
  const [country, setCountry] = useState(defaultCountry)

  const setCountryInternal = (country: string) => {
    setCountry(country)
    localStorage.setItem('country', country)
  }

  return (
    <CountryContext.Provider
      value={{ country, setCountry: setCountryInternal }}
    >
      {children}
    </CountryContext.Provider>
  )
}
