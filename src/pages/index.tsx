import React from 'react'
import { Container, Nav, Title } from '../components/layout'
import ListUser from '../components/listUser'
import { FormDialog } from '../components/modal'
import { ToastContainer } from 'react-nextjs-toast'

export default function Home(): JSX.Element {
  return (
    <Container>
      <Nav>
        <img src={'/logo.jpg'} />
        <Title>LISTA DE USUARIOS</Title>
        <FormDialog />
      </Nav>
      <ListUser />
      <ToastContainer />
    </Container>
  )
}
