import React, { useContext } from 'react'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'

import { FaTimes } from 'react-icons/fa'

import FilesContext from '../../contexts/files'

const Container = styled.div`
  position: absolute;

  width: 100%;
  height: calc(100vh - 32px);
  margin-top: 32px;

  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Convert: React.FC = () => {
  const { selectedFile } = useContext(FilesContext)

  return (
    <Container>
      <FaTimes size={16} color="#000" />
      <Document file={{ data: selectedFile.content }}>
        <Page pageNumber={1} />
        <Page pageNumber={2} />
        <Page pageNumber={3} />
        <Page pageNumber={4} />
      </Document>
    </Container>
  )
}

export default Convert
