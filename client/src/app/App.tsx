import React from 'react'
import { injectGlobal } from 'styled-components'

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
