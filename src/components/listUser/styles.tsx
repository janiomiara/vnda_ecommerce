import styled from 'styled-components'

const ContainerIcone = styled.div`
  display: flex;
`

const WrapperIcone = styled.span`
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  transition: 400ms;
  color: white;
  background-color: ${props => props.color};
  margin: 5px;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

export { WrapperIcone, ContainerIcone }
