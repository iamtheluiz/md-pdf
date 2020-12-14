import styled from 'styled-components'

export const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 32px;
  padding: 4px;
  background-color: #00000050;
  -webkit-app-region: no-drag;
`

export const DragContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  margin: 1px;
  -webkit-app-region: drag;
`

export const Button = styled.div`
  -webkit-app-region: no-drag;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 20px;
  cursor: pointer;
`
