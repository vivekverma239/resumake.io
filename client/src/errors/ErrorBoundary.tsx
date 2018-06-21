import React from 'react'
import styled from 'styled-components'

const Boundary = styled.div`
  width: 100vw;
  height: 100vh;
  background: red;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SupSon = styled.h2`
  margin: 0;
  font-size: 6em;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: help;
`

interface ErrorInfo {
  componentStack: string
}

interface Props {
  children: React.ReactNode
}

interface State {
  error: Error | null
  info: ErrorInfo | null
}

class ErrorBoundary extends React.Component<Props, State> {
  state = {
    error: null,
    info: null
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info })
    console.error({ error, info })
  }

  render() {
    if (!this.state.info) {
      return this.props.children
    }

    return (
      <Boundary>
        <SupSon>¯\_(ツ)_/¯</SupSon>
      </Boundary>
    )
  }
}

export default ErrorBoundary
