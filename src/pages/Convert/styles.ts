import styled, { keyframes } from 'styled-components'

export const List = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 8px;
`
export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc((100%/3) - 8px);
  height: 156px;
  margin: 4px;
  background-color: white;
  cursor: pointer;
  border: 1px solid #dadce0;
  background-color: #fff;
  border-radius: 6px;

  header {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  footer {
    width: 100%;
    padding: 13px 16px;
    border-top: 1px solid #dadce0;
    color: rgba(0,0,0,.72);
    font-weight: bold;
  }
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
