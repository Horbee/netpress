import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { CountryContextProvider } from './context/CountryContext'
import { DarkModeContextProvider } from './context/DarkModeContext'
import { MenuTabContextProvider } from './context/MenuTabContext'
import { RSSFeedContextProvider } from './context/RSSFeedContext'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 3 } },
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RSSFeedContextProvider>
        <CountryContextProvider>
          <DarkModeContextProvider>
            <MenuTabContextProvider>
              <App />
            </MenuTabContextProvider>
          </DarkModeContextProvider>
        </CountryContextProvider>
      </RSSFeedContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
