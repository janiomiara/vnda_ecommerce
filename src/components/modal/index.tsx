import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { AccountCircle } from '@material-ui/icons'
import { Container, Title } from './styles'
import { useUser } from '../../providers/users'
import { ModalContext } from '../../providers/modal'
import { useForm } from '../../providers/formUser'
import Form from '../form'

export const FormDialog: React.FC = () => {
  const { openModal, closeModal, state } = useContext(ModalContext)
  const { validateUser, submitForm } = useUser()

  const { clearForm, statusSubmit, status } = useForm()

  const showModal = () => {
    clearForm()
    statusSubmit('create')
    openModal()
  }

  const submit = async () => {
    if (validateUser()) {
      await submitForm()
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={showModal}>
        <AccountCircle /> Novo Usuário
      </Button>
      <Dialog
        open={state}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <Container status={status}>
          <AccountCircle />
          <Title>
            {status === 'create' ? 'Novo Usuario' : 'Editar Usuario'}
          </Title>
        </Container>
        <DialogContent>
          <Form />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} variant="outlined">
            Fechar
          </Button>
          <Button onClick={() => submit()} variant="contained" color="primary">
            {status === 'create' ? 'Criar Usuario' : 'Editar Usuario'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
