import React, { useContext } from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { FormContext, useForm } from '../../providers/formUser'
import { Alert } from '@material-ui/lab'

const Form: React.FC = () => {
  const [{ user }] = useContext(FormContext)
  const {
    handleChange,
    handleKeyDown,
    handleChangeTags,
    validateString,
    validateTags,
    validateInteger,
    error
  } = useForm()

  return (
    <form noValidate>
      <TextField
        onChange={e => handleChange(e.target)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="name"
        label="nome"
        type="text"
        id="nome"
        value={user.name}
        error={validateString(user.name)}
        helperText={validateString(user.name) && 'Nome não pode ser em branco.'}
      />
      <TextField
        onChange={e => handleChange(e.target)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        value={user.email}
        autoComplete="email"
        error={validateString(user.email)}
        helperText={
          validateString(user.email) && 'Email não pode ser em branco.'
        }
      />
      <TextField
        onChange={e => handleChange(e.target)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="codigo"
        label="codigo externo"
        name="external_code"
        value={user.external_code}
        error={validateString(user.external_code)}
        helperText={
          validateString(user.external_code) && 'Codigo não pode ser em branco.'
        }
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="standard-select-currency-native"
        select
        value={user.role}
        label="Função"
        name={'role'}
        type="number"
        onChange={e => handleChange(e.target)}
        error={validateInteger(user.role)}
        helperText={
          validateInteger(user.role) && 'Função não pode ser em branco.'
        }
        SelectProps={{ native: true }}
      >
        <option value={-1} disabled selected hidden>
          Selecionar
        </option>
        <option value={0}>Gestor</option>
        <option value={1}>Agente</option>
        <option value={2}>Local</option>
      </TextField>

      <Autocomplete
        multiple
        freeSolo
        fullWidth
        id="tags-outlined"
        options={[]}
        value={user.tags}
        onChange={(event, newValue) => handleChangeTags(newValue)}
        filterSelectedOptions
        renderInput={(params: any) => {
          params.inputProps.onKeyDown = handleKeyDown
          return (
            <TextField
              {...params}
              variant="outlined"
              label="Tgas"
              placeholder="Tgas"
              required
              margin="normal"
              fullWidth
              error={validateTags(user.tags)}
              helperText={
                validateTags(user.tags) && 'Tags não pode ser em branco.'
              }
            />
          )
        }}
      />
      {error && (
        <Alert severity="error">
          Codigo externo já está em uso ou email não é válido!
        </Alert>
      )}
    </form>
  )
}

export default Form
