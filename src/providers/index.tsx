import React, { FunctionComponent } from 'react'
import theme from '../styles/themes'
import { ThemeProvider } from '@material-ui/core/styles'
import { UserProvider } from './users'
import { ModalProvider } from './modal'
import { FormProvider } from './formUser'

const Providers: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <FormProvider>
        <UserProvider>
          <ModalProvider>{children}</ModalProvider>
        </UserProvider>
      </FormProvider>
    </ThemeProvider>
  )
}

export default Providers
