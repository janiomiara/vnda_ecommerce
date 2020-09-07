import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-items: center;
  align-items: center;
  background-color: ${(props: any) =>
    props.status === 'create' ? '#376288' : '#e29013'};
  padding: 25px;
  color: white;
`
const Title = styled.div`
  font-size: 16px;
  margin-left: 5px;
  font-weight: bold;
`

export { Container, Title }
