import React from 'react'
import { render } from 'react-dom'
import { ToastContainer } from 'react-toastify'
import { GlobalStyle } from './styles/GlobalStyle'

import { FilesProvider } from './context/files'

import Menu from './components/Menu'
import Routes from './routes'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Menu />
      <FilesProvider>
        <Routes />
      </FilesProvider>
      <ToastContainer />
    </>
  )
}

render(<App />, mainElement)
