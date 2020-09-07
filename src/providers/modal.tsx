import React, { createContext, FunctionComponent, useState } from 'react'

const ModalContext = createContext(null)

const ModalProvider: FunctionComponent = ({ children }) => {
  const [state, setState] = useState<boolean>(false)

  const openModal = () => {
    setState(true)
  }

  const closeModal = () => {
    setState(false)
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal, state }}>
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }
