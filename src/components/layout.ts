import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-items: center;
  align-items: center;
  background-color: #ececec;
  padding-left: 30px;
  padding-right: 30px;
`
export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  justify-items: center;
  align-items: center;
  align-content: center;
  background-color: #e3662d;
  padding-right: 15px;
  margin-bottom: 20px;

  img {
    height: 100px;
  }
`
export const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: white;
`
