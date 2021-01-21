import React from 'react'

import { FiX } from 'react-icons/fi'
import {
  Container,
  Header
} from './styles'

interface ModalProps {
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ open, children }) => {
  return (
    <>
      {open && (
        <Container>
          <Header>
            <FiX fill="white" size={18} />
          </Header>
          {children}
        </Container>
      )}
    </>
  )
}

export default Modal
