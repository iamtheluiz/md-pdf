import styled from 'styled-components'

export const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  margin-top: 4px;
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6d68cb;
  height: 100%;
  width: 48px;
  border-radius: 8px 0px 0px 8px;
`
export const ItemList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`
export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 8px;
  background-color: #eeeeee;
  color: black;
  font-weight: bold;
  
  transition: all 0.2s;
`
export const DeleteContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dd5e5e;
  height: 100%;
  width: 48px;
  border: 0px;
  border-radius: 0px 8px 8px 0px;
  outline: none;
  cursor: pointer;

  svg {
    transition: all 0.2s;
  }

  &:active {
    svg {
      width: 22px;
      height: 22px;
    }

    filter: brightness(0.5);
  }
`

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  margin-top: 16px;
`
