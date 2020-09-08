import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  useContext,
  useReducer
} from 'react'

import { url } from '../helpers/constants/urls'
import { useAxios } from '../helpers/axios'
import { useForm } from './formUser'
import { getDefaultUser, IUser } from '../types'
import { toastAlert } from '../components/alerts'
import { ModalContext } from './modal'

const UserContext = createContext(null)

const initialState: {
  userList: IUser[]
  isValid: boolean
  status: string
} = {
  userList: [getDefaultUser()],
  isValid: false,
  status: 'create'
}

enum ActionTypes {
  GET_USER_LIST = 'GET_USER_LIST',
  STATUS = 'STATUS',
  DELETE_USER = 'DELETE_USER'
}

interface Action {
  name?: string
  value?: any
  user?: IUser
  isValid?: boolean
  userList?: IUser[]
  type: ActionTypes
}

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.GET_USER_LIST:
      return { ...state, userList: action.userList, error: false }
    case ActionTypes.STATUS:
      return { ...state, status: action.value }
    case ActionTypes.DELETE_USER:
      const newUserList = state.userList.filter(
        user => user.id !== action.value
      )
      return { ...state, userList: newUserList, error: false }
    default:
      return state
  }
}

export function useUser() {
  const { closeModal } = useContext(ModalContext)
  const { apiClient } = useAxios()
  const { clearForm, validateUser, user, status, statusError } = useForm()

  const [{ userList, isValid }, dispatch] = useContext<
    [typeof initialState, Dispatch<Action>]
  >(UserContext)

  const getUsers = async (): Promise<void> => {
    try {
      const { data } = await apiClient.get<IUser[]>(url.USER_LIST)
      dispatch({ type: ActionTypes.GET_USER_LIST, userList: data })
    } catch (err) {
      toastAlert.error()
      statusError()
    }
  }

  const submitForm = async () => {
    if (status === 'create') {
      await createUsers()
    } else {
      await udpateUser()
    }
  }

  const createUsers = async () => {
    if (validateUser) {
      try {
        await apiClient.post<IUser>(url.USER_LIST, user)
        await getUsers()
        clearForm()
        closeModal()
        toastAlert.success('Usuario criado com sucesso!')
        return true
      } catch (err) {
        statusError()
        toastAlert.error()
        return false
      }
    }
  }

  const udpateUser = async () => {
    const { id } = user
    try {
      if (isValid) {
        await apiClient.patch(`${url.USER_LIST}/${id}`, user)
        toastAlert.success('Usuario editado com sucesso!')
        await getUsers()
        clearForm()
        closeModal()
        return true
      }
    } catch (err) {
      statusError()
      toastAlert.error()
      return false
    }
  }

  const removeUser = async user => {
    const { id } = user
    try {
      await apiClient.delete(`${url.USER_LIST}/${id}`)
      await dispatch({ type: ActionTypes.DELETE_USER, value: id })
      toastAlert.success('Usuario removido com sucesso!')
    } catch (err) {
      toastAlert.error()
    }
  }

  return {
    userList,
    user,
    isValid,
    getUsers,
    validateUser,
    createUsers,
    submitForm,
    removeUser
  }
}

const UserProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
