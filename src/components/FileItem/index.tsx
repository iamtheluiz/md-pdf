import React from 'react'

import { Container, Header, Footer } from './styles'

interface FileItemProps {
  name: string;
  onClick?: () => void | undefined;
}

const FileItem: React.FC<FileItemProps> = ({ name, children, onClick }) => {
  return (
    <Container onClick={onClick}>
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
