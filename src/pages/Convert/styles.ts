import styled, { keyframes } from 'styled-components'

export const List = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 8px;
`

const bounce = keyframes`
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
`

export const Loader = styled.div`
  width: 40px;
  height: 40px;

  position: relative;

  .bounce1, .bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #282a36;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    
    -webkit-animation: ${bounce} 2.0s infinite ease-in-out;
    animation: ${bounce} 2.0s infinite ease-in-out;
  }

  .bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
`

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;

  button {
    width: 50%;
    margin: 5px;
  }

  button:nth-child(2) {
    background-color: #5edd73;
  }
`
