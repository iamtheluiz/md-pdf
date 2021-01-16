import React from 'react'
import { FilesProvider } from './files'
import { OutputProvider } from './output'

const AppProvider: React.FC = ({ children }) => {
  return (
    <FilesProvider>
      <OutputProvider>
        {children}
      </OutputProvider>
    </FilesProvider>
  )
}

export default AppProvider
