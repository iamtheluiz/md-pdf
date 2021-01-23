import React, { useContext, useEffect } from 'react'
import path from 'path'
import { useHistory } from 'react-router-dom'
import { ipcRenderer } from 'electron'

import FilesContext from '../../contexts/files'
import OutputContext from '../../contexts/output'

import { FaFilePdf } from 'react-icons/fa'
import {
  List,
  Loader
} from './styles'
import FileItem from '../../components/FileItem'
import PreviewContext from '../../contexts/preview'
import PdfView from '../PdfView'

const ConvertFileList: React.FC = () => {
  const { files, setFileAsConverted, setIsConverted } = useContext(FilesContext)
  const { selectedFile, setSelectedFile } = useContext(PreviewContext)
  const { outputFolder } = useContext(OutputContext)
  const history = useHistory()

  useEffect(() => {
    if (files.length === 0 || outputFolder === '') {
      history.push('/')
      return
    }

    async function convertFiles () {
      for (const file of files) {
        const filePath = path.resolve(outputFolder, `${file.name.split('.')[0]}.pdf`)

        await ipcRenderer.invoke('convertFileToPdf', {
          from: file.absolutePath,
          to: filePath
        })

        setFileAsConverted(file)
      }
    }

    convertFiles()
  }, [])

  useEffect(() => {
    if (files.length !== 0) {
      const fileStatus = files.map(file => file.converted)

      const status = fileStatus.reduce((previous, current) => !current ? false : previous)

      setIsConverted(status)
    }
  }, [files])

  return (
    <>
      <PdfView file={selectedFile} setFile={setSelectedFile} />
      <List>
        {files.map(file => (
          <FileItem
            key={file.absolutePath}
            name={file.converted ? file.name : 'Loading...'}
            onClick={file.converted ? () => setSelectedFile(file) : undefined}
          >
            {file.converted ? (
              <FaFilePdf size={52} color="#ea4335" />
            ) : (
              <Loader>
                <div className="bounce1"></div>
                <div className="bounce2"></div>
              </Loader>
            )}
          </FileItem>
        ))}
      </List>
    </>
  )
}

export default ConvertFileList
