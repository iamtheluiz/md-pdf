import path from 'path'
import { remote } from 'electron'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FaUpload, FaFileUpload, FaTimes, FaArrowRight, FaFolder } from 'react-icons/fa'
import {
  DeleteContainer,
  Footer,
  IconContainer,
  Item,
  ItemContent,
  ItemList
} from './styles'
import {
  Container,
  Content,
  Title,
  LargeButton,
  ButtonContainer,
  Button
} from '../../styles/GlobalComponents'

import FilesContext, { File } from '../../context/files'

const Main: React.FC = () => {
  const { files, setFiles, outputFolder, setOutputFolder } = useContext(FilesContext)
  const history = useHistory()

  function handleOpenDialog () {
    remote.dialog.showOpenDialog({
      properties: ['multiSelections'],
      filters: [
        {
          extensions: ['md'],
          name: 'Markdown'
        }
      ]
    }).then(response => {
      const filePaths = response.filePaths
      const filesSanitized: File[] = [...files]

      filePaths.forEach(filePath => {
        const file = {
          absolutePath: filePath,
          name: path.basename(filePath),
          ext: path.extname(path.basename(filePath))
        }

        if (!files.some(item => item.absolutePath === file.absolutePath)) {
          filesSanitized.push(file)
        } else {
          toast.warn(`${file.name} already selected!`)
        }
      })

      setFiles(filesSanitized)
    })
  }

  function handleOutputDialog () {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(response => {
      let selectedFolder = response.filePaths[0]

      if (selectedFolder === undefined) {
        selectedFolder = outputFolder
      }

      setOutputFolder(selectedFolder)
    })
  }

  function removeFileFromList (absolutePath: string) {
    const removedFile = files.filter(file => file.absolutePath === absolutePath)[0]
    const filteredFiles = files.filter(file => file.absolutePath !== absolutePath)

    toast.success(`${removedFile.name} removed!`)

    setFiles(filteredFiles)
  }

  function formatOutputPath (path: string) {
    const splitPath = path.split('\\')

    if (splitPath.length > 3) {
      path = `${splitPath[0]}/../${splitPath.reverse()[1]}/${splitPath[0]}`
    }

    return path
  }

  function handleNavigateToConvertPage () {
    history.push('/convert')
  }

  return (
    <Container>
      <Content>
        <Title>MD to PDF</Title>
        <LargeButton onClick={handleOpenDialog}>
          <FaUpload size={26} color="white" style={{ marginRight: 8 }} />
          Select Files
        </LargeButton>
        <ItemList>
          {files.map(file => (
            <Item key={file.name}>
              <IconContainer>
                <FaFileUpload size={26} color="white" />
              </IconContainer>
              <ItemContent>
                {file.name}
              </ItemContent>
              <DeleteContainer onClick={() => { removeFileFromList(file.absolutePath) }}>
                <FaTimes size={26} color="white" />
              </DeleteContainer>
            </Item>
          ))}
        </ItemList>
        {files.length !== 0 && (
          <Footer>
            <ButtonContainer style={{
              flexDirection: 'row-reverse'
            }}
            onClick={handleOutputDialog}
            active={outputFolder !== ''}
            >
              <span>
                {outputFolder === '' ? 'Output Folder' : formatOutputPath(outputFolder)}</span>
              <Button style={{ backgroundColor: '#e29d52' }}>
                <FaFolder size={26} color="white" />
              </Button>
            </ButtonContainer>
            <ButtonContainer active={outputFolder !== ''} onClick={handleNavigateToConvertPage}>
              <span>Next</span>
              <Button disabled={outputFolder === ''}>
                <FaArrowRight size={26} color="white" />
              </Button>
            </ButtonContainer>
          </Footer>
        )}
      </Content>
    </Container>
  )
}

export default Main
