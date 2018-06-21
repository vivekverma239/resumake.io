import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import ErrorBoundary from '../errors'

injectGlobal`
  body {
    margin: 0;
    background: white;
    color: black;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
`

function App() {
  return (
    <div>
      <h1>Resumake</h1>
    </div>
  )
}

export default App
