import React, { useState } from 'react'

import path from 'path'
import { toast } from 'react-toastify'

export interface File {
  name: string;
  ext: string;
  absolutePath: string;
  content?: Array<number>[]
}

interface FilesContext {
  files: File[];
  setFiles: (value: File[]) => void;
  selectedFile: File;
  setSelectedFile: (value: File) => void;
  addFilesToList: (paths: string[]) => void;
  removeFileFromList: (fileToRemove: File) => void;
}

const FilesContext = React.createContext<FilesContext>({} as FilesContext)

export const FilesProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState<File[]>([])
  const [selectedFile, setSelectedFile] = useState<File>({} as File)

  const addFilesToList = (paths: string[]) => {
    const filesSanitized: File[] = [...files]

    paths.forEach(filePath => {
      const file = {
        absolutePath: filePath,
        name: path.basename(filePath),
        ext: path.extname(path.basename(filePath))
      }

      if (!files.some(item => item.absolutePath === file.absolutePath)) {
        filesSanitized.push(file)
      } else {
        toast.warn(`${file.name} already selected!`)
      }
    })

    setFiles(filesSanitized)
  }

  const removeFileFromList = (fileToRemove: File) => {
    const removedFile = files.filter(file => file.absolutePath === fileToRemove.absolutePath)[0]
    const filteredFiles = files.filter(file => file.absolutePath !== fileToRemove.absolutePath)

    toast.success(`${removedFile.name} removed!`)

    setFiles(filteredFiles)
  }

  return (
    <FilesContext.Provider value={{
      files,
      setFiles,
      selectedFile,
      setSelectedFile,
      addFilesToList,
      removeFileFromList
    }}>
      {children}
    </FilesContext.Provider>
  )
}

export default FilesContext
