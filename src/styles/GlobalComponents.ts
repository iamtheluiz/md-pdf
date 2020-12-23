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
export const Content = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  width: 100%;
  margin-bottom: 8px;
  text-align: center;
  font-size: 52px;
  color: white;
  font-weight: bold;
`
export const LargeButton = styled.button`
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

export const ButtonContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  border-radius: 8px;
  background-color: #eeeeee;
  color: #3a3a3a;
  cursor: pointer;

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
export const Button = styled.button`
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

  &:disabled, &:hover:disabled, &:active:disabled {
    svg {
      width: 26px;
      height: 26px;
    }

    filter: grayscale(1) brightness(0.8);
    cursor: initial;
  }
`
