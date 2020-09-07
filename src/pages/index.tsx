import React from 'react'
import { Container, Nav } from '../components/layout'
import ListUser from '../components/listUser'
import { FormDialog } from '../components/modal'
import { ToastContainer } from 'react-toastify'

export default function Home(): JSX.Element {
  return (
    <Container>
      <Nav>
        <FormDialog />
      </Nav>

      <ListUser />
    </Container>
  )
}
