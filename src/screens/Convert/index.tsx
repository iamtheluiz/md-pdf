import React, { useContext } from 'react'
import { ipcRenderer } from 'electron'
import { useHistory } from 'react-router-dom'

import { FaFolder, FaCheck } from 'react-icons/fa'
import { Footer } from './styles'
import {
  Container,
  Content,
  LargeButton,
  Title
} from '../../styles/GlobalComponents'

import ConvertFileList from '../ConvertFileList'

import FilesContext from '../../contexts/files'
import OutputContext from '../../contexts/output'
import { PreviewProvider } from '../../contexts/preview'

const Convert: React.FC = () => {
  const { isConverted, resetFileContext } = useContext(FilesContext)
  const { outputFolder, setOutputFolder } = useContext(OutputContext)
  const history = useHistory()

  async function handleOpenOutputFolder () {
    await ipcRenderer.invoke('openFolder', outputFolder)
  }

  function resetApplication () {
    setOutputFolder('')
    resetFileContext()

    history.push('/')
  }

  return (
    <PreviewProvider>
      <Container>
        <Content>
          <Title>MD to PDF</Title>
          <ConvertFileList />
          <Footer>
            <LargeButton onClick={handleOpenOutputFolder}>
              <FaFolder size={26} color="white" style={{ marginRight: 8 }} />
            Open Folder
            </LargeButton>
            <LargeButton disabled={!isConverted} onClick={resetApplication}>
              <FaCheck size={26} color="white" style={{ marginRight: 8 }} />
            Finish
            </LargeButton>
          </Footer>
        </Content>
      </Container>
    </PreviewProvider>
  )
}

export default Convert
