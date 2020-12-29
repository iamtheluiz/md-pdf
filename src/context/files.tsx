import React, { useState } from 'react'

export interface File {
  name: string;
  ext: string;
  absolutePath: string;
}

interface FilesContext {
  outputFolder: string;
  setOutputFolder: (value: string) => void;
  files: File[];
  setFiles: (value: File[]) => void;
}

const FilesContext = React.createContext<FilesContext>({} as FilesContext)

export const FilesProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState<File[]>([])
  const [outputFolder, setOutputFolder] = useState<string>('')

  return (
    <FilesContext.Provider value={{
      files,
      setFiles,
      outputFolder,
      setOutputFolder
    }}>
      {children}
    </FilesContext.Provider>
  )
}

export default FilesContext
