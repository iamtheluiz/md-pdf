import React from 'react'

import { Container, Header, Footer } from './styles'

interface FileItemProps {
  name: string;
}

const FileItem: React.FC<FileItemProps> = ({ name, children }) => {
  return (
    <Container>
      <Header>
        {children}
      </Header>
      <Footer>
        <span>{name}</span>
      </Footer>
    </Container>
  )
}

export default FileItem
