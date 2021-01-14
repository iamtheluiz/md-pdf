import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: calc((100%/3) - 8px);
  height: 156px;
  margin: 4px;
  border: 1px solid #dadce0;
  border-radius: 6px;

  background-color: white;
  cursor: pointer;
`

export const Header = styled.header`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Footer = styled.footer`
  width: 100%;
  padding: 13px 16px;
  border-top: 1px solid #dadce0;

  color: rgba(0,0,0,.72);
  font-weight: bold;

  // Ellipsis on big texts
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
