import React, { useState } from 'react'

export interface File {
  name?: string;
  ext?: string;
  absolutePath: string;
}

interface FilesContext {
  files: File[];
  setFiles: (value: File[]) => void
}

const FilesContext = React.createContext<FilesContext>({} as FilesContext)

export const FilesProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState<File[]>([])

  return (
    <FilesContext.Provider value={{
      files,
      setFiles
    }}>
      {children}
    </FilesContext.Provider>
  )
}

export default FilesContext
