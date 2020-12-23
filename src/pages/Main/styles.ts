import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 32px);
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const Title = styled.h1`
  width: 100%;
  margin-bottom: 8px;
  text-align: center;
  font-size: 52px;
  color: white;
  font-weight: bold;
`
export const DialogButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  border: 0px;
  border-radius: 8px;
  background-color: #6d68cb;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.2s;
  outline: none;
  cursor: pointer;

  &:active {
    filter: brightness(0.5);
  }
`

export const Content = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
`

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
export const FooterItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  border-radius: 8px;
  background-color: #eeeeee;
  color: #3a3a3a;

  span {
    padding: ${props => props.active ? '4px' : '2px'};
    max-width: ${props => props.active ? '480px' : '0'};
    overflow: hidden;
    font-weight: 600;
    transition: all 0.2s;
    color: ${props => props.active ? 'inherit' : 'transparent'};
  }
  
  &:hover span {
    padding: 6px;
    max-width: 480px;
    color: inherit;
  }
`
export const Next = styled.button<{invert: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5edd73;
  height: 100%;
  width: 48px;
  border: 0px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;

  svg {
    transition: all 0.2s;
  }

  &:hover {
    svg {
      width: 28px;
      height: 28px;
    }

    filter: brightness(0.9);
  }

  &:active {
    svg {
      width: 22px;
      height: 22px;
    }

    filter: brightness(0.5);
  }
`
