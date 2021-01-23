import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 32px;
  left: 0;

  width: 100%;
  height: calc(100vh - 32px);
  background-color: white;

  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  
  z-index: 9999;
`

export const Header = styled.header`
  position: absolute;
  top: 0;

  width: 100%;
  height: 20px;

  display: flex;
  flex-direction: row-reverse;
`
