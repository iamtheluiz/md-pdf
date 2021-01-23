import React from 'react'

import { FiX } from 'react-icons/fi'
import {
  Container,
  Header
} from './styles'

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  backgroundColor?: string;
}

const Modal: React.FC<ModalProps> = ({ open, setOpen, backgroundColor, children }) => {
  return (
    <>
      {open && (
        <Container style={ backgroundColor ? { backgroundColor } : {}}>
          <Header>
            <FiX fill="black" size={24} onClick={() => setOpen(false)} />
          </Header>
          {children}
        </Container>
      )}
    </>
  )
}

export default Modal
