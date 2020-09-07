import React, { useContext, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { HighlightOffOutlined, EditOutlined } from '@material-ui/icons'
import { UserContext, useUser } from '../../providers/users'
import { ModalContext } from '../../providers/modal'
import { IUser } from '../../types'
import { useForm } from '../../providers/formUser'
import { ContainerIcone, WrapperIcone } from './styles'

const ListUser: () => JSX.Element = () => {
  const [state] = useContext(UserContext)
  const { openModal } = useContext(ModalContext)
  const { getUsers, removeUser } = useUser()
  const { statusSubmit, updateUserForm } = useForm()

  const updateUser = (user: IUser) => {
    statusSubmit('update')
    openModal()
    updateUserForm(user)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NOME</TableCell>
            <TableCell>EMAIL</TableCell>
            <TableCell>CÓDIGO EXTERNO</TableCell>
            <TableCell>AÇÕES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.userList.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.external_code}</TableCell>
              <TableCell>
                <ContainerIcone>
                  <WrapperIcone color={'orange'}>
                    <EditOutlined onClick={() => updateUser(row)} />
                  </WrapperIcone>
                  <WrapperIcone color={'red'}>
                    <HighlightOffOutlined onClick={() => removeUser(row)} />
                  </WrapperIcone>
                </ContainerIcone>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ListUser
