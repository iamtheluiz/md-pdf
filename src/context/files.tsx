import React, { useState } from 'react'

export interface File {
  name: string;
  ext: string;
  absolutePath: string;
  content?: Array<number>[]
}

interface FilesContext {
  outputFolder: string;
  setOutputFolder: (value: string) => void;
  files: File[];
  setFiles: (value: File[]) => void;
  selectedFile: File;
  setSelectedFile: (value: File) => void;
}

const FilesContext = React.createContext<FilesContext>({} as FilesContext)

export const FilesProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState<File[]>([])
  const [outputFolder, setOutputFolder] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File>({} as File)

  return (
    <FilesContext.Provider value={{
      files,
      setFiles,
      outputFolder,
      setOutputFolder,
      selectedFile,
      setSelectedFile
    }}>
      {children}
    </FilesContext.Provider>
  )
}

export default FilesContext
