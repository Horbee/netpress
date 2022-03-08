import './config/i18n'

import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import smoothscroll from 'smoothscroll-polyfill'

import App from './App'
import { ServiceProviders } from './context/ServiceProviders'
import { SettingsContextProvider } from './context/SettingsContext'
import { StorageContextProvider } from './context/StorageContext'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

smoothscroll.polyfill()

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 3 } },
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StorageContextProvider>
        <SettingsContextProvider>
          <ServiceProviders>
            <App />
          </ServiceProviders>
        </SettingsContextProvider>
      </StorageContextProvider>
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
