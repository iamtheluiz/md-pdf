import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import path from 'path'
import { ipcRenderer } from 'electron'

import { FaFolder, FaCheck, FaFilePdf } from 'react-icons/fa'
import { List, Loader, Footer } from './styles'
import {
  Container,
  Content,
  LargeButton,
  Title
} from '../../styles/GlobalComponents'

import FileItem from '../../components/FileItem'
import PdfView from '../../components/PdfView'

import FilesContext, { File } from '../../contexts/files'
import OutputContext from '../../contexts/output'

const Convert: React.FC = () => {
  const [isConverted, setIsConverted] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File>({} as File)
  const { files, setFileAsConverted } = useContext(FilesContext)
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

  async function handleOpenOutputFolder () {
    await ipcRenderer.invoke('openFolder', outputFolder)
  }

  return (
    <Container>
      <Content>
        <Title>MD to PDF</Title>
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
        <Footer>
          <LargeButton onClick={handleOpenOutputFolder}>
            <FaFolder size={26} color="white" style={{ marginRight: 8 }} />
            Open Folder
          </LargeButton>
          <LargeButton disabled={!isConverted}>
            <FaCheck size={26} color="white" style={{ marginRight: 8 }} />
            Finish
          </LargeButton>
        </Footer>
      </Content>
      {selectedFile.absolutePath && (
        <PdfView file={selectedFile} />
      )}
    </Container>
  )
}

export default Convert
