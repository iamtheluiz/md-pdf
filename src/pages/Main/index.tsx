import path from 'path'
import { remote } from 'electron'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'

import { FaUpload, FaFileUpload, FaTimes, FaArrowRight } from 'react-icons/fa'
import {
  Container,
  Content,
  DeleteContainer,
  DialogButton,
  Footer,
  IconContainer,
  Item,
  ItemContent,
  ItemList,
  Next,
  Title
} from './styles'

import FilesContext, { File } from '../../context/files'

const Main: React.FC = () => {
  const { files, setFiles } = useContext(FilesContext)

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

  function removeFileFromList (absolutePath: string) {
    const filteredFiles = files.filter(file => file.absolutePath !== absolutePath)

    setFiles(filteredFiles)
  }

  return (
    <Container>
      <Content>
        <Title>MD to PDF</Title>
        <DialogButton onClick={handleOpenDialog}>
          <FaUpload size={26} color="white" style={{ marginRight: 8 }} />
          Select Files
        </DialogButton>
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
            Next
            <Next>
              <FaArrowRight size={26} color="white" />
            </Next>
          </Footer>
        )}
      </Content>
    </Container>
  )
}

export default Main
