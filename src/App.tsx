import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'

import Menu from './components/Menu'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Menu />
    </>
  )
}

render(<App />, mainElement)
