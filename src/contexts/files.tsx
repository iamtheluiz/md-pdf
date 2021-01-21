import React, { useState } from 'react'

import path from 'path'
import { toast } from 'react-toastify'

export interface File {
  name: string;
  ext: string;
  absolutePath: string;
  converted: boolean;
}

interface FilesContext {
  files: File[];
  setFiles: (value: File[]) => void;
  isConverted: boolean;
  setIsConverted: (value: boolean) => void
  addFilesToList: (paths: string[]) => void;
  removeFileFromList: (fileToRemove: File) => void;
  setFileAsConverted: (file: File) => void;
}

const FilesContext = React.createContext<FilesContext>({} as FilesContext)

export const FilesProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState<File[]>([])
  const [isConverted, setIsConverted] = useState<boolean>(false)

  const addFilesToList = (paths: string[]) => {
    const filesSanitized: File[] = [...files]

    paths.forEach(filePath => {
      const file: File = {
        absolutePath: filePath,
        name: path.basename(filePath),
        ext: path.extname(path.basename(filePath)),
        converted: false
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

  const setFileAsConverted = (file: File) => {
    setFiles(previousState => previousState.map(
      item => item.absolutePath === file.absolutePath
        ? { ...item, converted: true }
        : item
    ))
  }

  return (
    <FilesContext.Provider value={{
      files,
      setFiles,
      isConverted,
      setIsConverted,
      addFilesToList,
      removeFileFromList,
      setFileAsConverted
    }}>
      {children}
    </FilesContext.Provider>
  )
}

export default FilesContext
