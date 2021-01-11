import { ipcRenderer } from 'electron'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { pdfjs } from 'react-pdf'

import path from 'path'

import { FaArrowLeft, FaFilePdf } from 'react-icons/fa'
import { List, Item, Loader } from './styles'
import {
  Container,
  Content,
  LargeButton,
  Title
} from '../../styles/GlobalComponents'

import FilesContext, { File } from '../../context/files'

const Convert: React.FC = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = 'js/pdf.worker.js'
  const { files, outputFolder } = useContext(FilesContext)
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
          <Item key={index}>
            <header>
              <Loader>
                <div className="bounce1"></div>
                <div className="bounce2"></div>
              </Loader>
            </header>
            <footer>
              <span>Carregando...</span>
            </footer>
          </Item>
        ))}
      </>
    )
  }

  return (
    <Container>
      <Content>
        <Title>MD to PDF</Title>
        <LargeButton onClick={() => history.push('/')}>
          <FaArrowLeft size={26} color="white" style={{ marginRight: 8 }} />
          Return to Main
        </LargeButton>
        <List>
          {pdfs.map(pdf => (
            <Item key={pdf.absolutePath}>
              <header>
                <FaFilePdf size={52} color="#ea4335" />
              </header>
              <footer>
                <span>{pdf.name}</span>
              </footer>
            </Item>
          ))}
          {renderLoadingItems(files.length - pdfs.length)}
        </List>
      </Content>
    </Container>
  )
}

export default Convert
