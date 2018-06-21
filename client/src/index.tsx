import React from 'react'
import { render } from 'react-dom'
import ErrorBoundary from './errors'
import App from './app'

const root = document.querySelector('#app')

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  root
)

export default App
