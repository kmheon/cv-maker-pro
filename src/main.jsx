import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App'
import LandingPage from './landing/LandingPage'
import PublicCvView from './PublicCvView'

import {
  ThemeProvider,
} from './context/ThemeContext'

const pathname = window.location.pathname

const cvMatch = pathname.match(/^\/cv\/([a-f0-9]+)\/?$/)

const isLanding =
  pathname === '/' ||
  pathname === '/index.html'

const RootComponent = cvMatch ? (
  <PublicCvView id={cvMatch[1]} />
) : (
  <ThemeProvider>
    {isLanding ? (
      <LandingPage />
    ) : (
      <App />
    )}
  </ThemeProvider>
)

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    {RootComponent}
  </React.StrictMode>
)