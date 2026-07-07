import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App'
import PublicCvView from './PublicCvView'

import {
  ThemeProvider,
} from './context/ThemeContext'

/**
 * Minimal path-based routing — deliberately not using a router library
 * so the app has no extra dependency for a single public route.
 * Matches "/cv/:id" and renders the read-only public CV viewer;
 * everything else renders the normal editor app.
 */
const cvMatch = window.location.pathname.match(/^\/cv\/([a-f0-9]+)\/?$/)

const RootComponent = cvMatch ? (
  <PublicCvView id={cvMatch[1]} />
) : (
  <ThemeProvider>
    <App />
  </ThemeProvider>
)

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    {RootComponent}
  </React.StrictMode>
)