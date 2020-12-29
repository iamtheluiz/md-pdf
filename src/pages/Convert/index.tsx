import { ipcRenderer } from 'electron'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { Document, Page, pdfjs } from 'react-pdf'

import path from 'path'

import { ItemContainer, List, Loader } from './styles'
import {
  Container,
  Content,
  LargeButton,
  Title
} from '../../styles/GlobalComponents'

import FilesContext from '../../context/files'

const Convert: React.FC = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = 'js/pdf.worker.js'
  const { files, outputFolder } = useContext(FilesContext)
  const [pdfs, setPdfs] = useState<Array<number>[]>([])
  const history = useHistory()

  useEffect(() => {
    if (files.length === 0 || outputFolder === '') {
      history.push('/')
      return
    }

    async function convertFiles () {
      let pdfsArray: Array<number>[] = []
      for (const file of files) {
        const filePath = path.resolve(outputFolder, `${file.name.split('.')[0]}.pdf`)

        const pdf = await ipcRenderer.invoke('convertFileToPdf', {
          from: file.absolutePath,
          to: filePath
        })

        pdfsArray = [...pdfsArray, pdf]

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
          <ItemContainer key={index}>
            <Loader>
              <div className="bounce1"></div>
              <div className="bounce2"></div>
            </Loader>
          </ItemContainer>
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
          {pdfs.map((pdf, index) => (
            <ItemContainer key={index}>
              {pdf !== null && (
                <Document
                  file={{
                    data: pdf
                  }}
                >
                  <Page pageNumber={1} />
                </Document>
              )}
            </ItemContainer>
          ))}
          {renderLoadingItems(files.length - pdfs.length)}
        </List>
      </Content>
    </Container>
  )
}

export default Convert
