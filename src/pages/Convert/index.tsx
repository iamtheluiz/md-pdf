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

import FilesContext, { File } from '../../contexts/files'
import OutputContext from '../../contexts/output'

const Convert: React.FC = () => {
  const { files } = useContext(FilesContext)
  const { outputFolder } = useContext(OutputContext)
  const [pdfs, setPdfs] = useState<File[]>([])
  const history = useHistory()

  useEffect(() => {
    if (files.length === 0 || outputFolder === '') {
      history.push('/')
      return
    }

    async function convertFiles () {
      let pdfsArray: File[] = []

      for (const file of files) {
        const filePath = path.resolve(outputFolder, `${file.name.split('.')[0]}.pdf`)

        const pdf = await ipcRenderer.invoke('convertFileToPdf', {
          from: file.absolutePath,
          to: filePath
        })

        pdfsArray = [...pdfsArray, {
          absolutePath: pdf,
          ext: path.extname(file.name),
          name: `${file.name.split('.')[0]}.pdf`
        }]

        setPdfs(pdfsArray)
      }
    }

    convertFiles()
  }, [])

  function renderLoadingItems (length: number) {
    const items = (new Array(length)).fill('-', 0)

    return (
      <>
        {items.map((item, index) => (
          <FileItem key={index} name="Loading...">
            <Loader>
              <div className="bounce1"></div>
              <div className="bounce2"></div>
            </Loader>
          </FileItem>
        ))}
      </>
    )
  }

  async function handleOpenOutputFolder () {
    await ipcRenderer.invoke('openFolder', outputFolder)
  }

  return (
    <Container>
      <Content>
        <Title>MD to PDF</Title>
        <List>
          {pdfs.map(pdf => (
            <FileItem
              key={pdf.absolutePath}
              name={pdf.name}
            >
              <FaFilePdf size={52} color="#ea4335" />
            </FileItem>
          ))}
          {renderLoadingItems(files.length - pdfs.length)}
        </List>
        <Footer>
          <LargeButton onClick={handleOpenOutputFolder}>
            <FaFolder size={26} color="white" style={{ marginRight: 8 }} />
            Open Folder
          </LargeButton>
          <LargeButton disabled={files.length !== pdfs.length}>
            <FaCheck size={26} color="white" style={{ marginRight: 8 }} />
            Finish
          </LargeButton>
        </Footer>
      </Content>
    </Container>
  )
}

export default Convert
