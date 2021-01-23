import React, { useState } from 'react'
import { File } from './files'

interface PreviewContext {
  selectedFile: File;
  setSelectedFile: (file: File) => void;
}

const PreviewContext = React.createContext<PreviewContext>({} as PreviewContext)

export const PreviewProvider: React.FC = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState<File>({} as File)

  return (
    <PreviewContext.Provider value={{
      selectedFile,
      setSelectedFile
    }}>
      {children}
    </PreviewContext.Provider>
  )
}

export default PreviewContext
