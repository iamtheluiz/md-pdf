import React, { useEffect, useState, useContext, useRef } from 'react'
import styled from 'styled-components'
import { pdfjs, Document, Page } from 'react-pdf'

import path from 'path'
import { ipcRenderer } from 'electron'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import Modal from '../../components/Modal'
import OutputContext from '../../contexts/output'
import { File } from '../../contexts/files'

interface PdfProps {
  file: File;
  setFile: (file: File) => void;
}

interface PdfInfo {
  numPages: number;
}

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  canvas {
    width: auto !important;
  }
`

const Footer = styled.footer`
  width: 100%;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  span {
    padding: 0px 20px;
    font-size: 18px;
  }

  svg {
    cursor: pointer;
  }
`

const PdfView: React.FC<PdfProps> = ({ file, setFile }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.js'

  const { outputFolder } = useContext(OutputContext)
  const [isOpen, setIsOpen] = useState(false)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [content, setContent] = useState<string | null>(null)

  const viewContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (file.absolutePath) {
      const getFileContent = async () => {
        const filePath = path.resolve(outputFolder, `${file.name.split('.')[0]}.pdf`)
        const fileContent = await ipcRenderer.invoke('getFileData', filePath)

        const blob = new Blob([fileContent], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)

        setContent(url)
      }

      setIsOpen(true)
      getFileContent()
    }
  }, [file])

  useEffect(() => {
    if (!isOpen) {
      setContent(null)
      setFile({} as File)
    }
  }, [isOpen])

  function onDocumentLoadSuccess ({ numPages }: PdfInfo) {
    setNumPages(numPages)
  }

  function changePage (page: number) {
    if (page > 0 && page <= numPages) {
      setPageNumber(page)
    }
  }

  return (
    <Modal open={isOpen} setOpen={setIsOpen} backgroundColor="#282a36">
      <Content ref={viewContainer}>
        {content !== null && (
          <Document
            file={{
              url: content
            }}
            className="document"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {viewContainer.current !== null && (
              <Page
                pageNumber={pageNumber}
                height={viewContainer.current?.clientHeight}
              />
            )}
          </Document>
        )}
      </Content>
      <Footer>
        <FaChevronLeft
          size={18}
          color="white"
          onClick={() => changePage(pageNumber - 1)}
        />
        <span>{pageNumber} / {numPages}</span>
        <FaChevronRight
          size={18}
          color="white"
          onClick={() => changePage(pageNumber + 1)}
        />
      </Footer>
    </Modal>
  )
}

export default React.memo(PdfView)
