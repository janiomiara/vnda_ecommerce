import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  useContext,
  useReducer
} from 'react'
import { getDefaultUser, IUser } from '../types'

const FormContext = createContext(null)

const initialState: {
  isValid: boolean
  user: IUser
  status: string
  statusForm: boolean
  error?: boolean
} = {
  user: getDefaultUser(),
  status: 'create',
  isValid: false,
  statusForm: false,
  error: false
}

enum ActionTypes {
  SET_USER = 'SET_USER',
  SET_ALL_TAGS = 'SET_ALL_TAGS',
  SET_TAGS = 'SET_TAGS',
  VALIDET_INPUT = 'VALIDET_INPUT',
  USER_RESET = 'USER_RESET',
  UPDATE_USER = 'UPDATE_USER',
  STATUS = 'STATUS',
  ERROR = 'ERROR'
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
    case ActionTypes.SET_USER:
      return { ...state, user: { ...state.user, [action.name]: action.value } }
    case ActionTypes.SET_TAGS:
      let { tags } = state.user
      tags = [...tags, action.value]
      const newTagsUserForm = { ...state.user, tags }
      return { ...state, user: newTagsUserForm }
    case ActionTypes.SET_ALL_TAGS:
      return { ...state, user: { ...state.user, tags: action.value } }
    case ActionTypes.UPDATE_USER:
      return { ...state, user: action.value }
    case ActionTypes.VALIDET_INPUT:
      return { ...state, isValid: action.isValid, statusForm: true }
    case ActionTypes.STATUS:
      return { ...state, status: action.value }
    case ActionTypes.ERROR:
      return { ...state, error: true }
    case ActionTypes.USER_RESET:
      return {
        ...state,
        user: getDefaultUser(),
        isValid: false,
        statusForm: false,
        error: false
      }
    default:
      return state
  }
}

export function useForm() {
  const [{ user, isValid, statusForm, status, error }, dispatch] = useContext<
    [typeof initialState, Dispatch<Action>]
  >(FormContext)

  const validateString = (value: string) =>
    statusForm &&
    value !== null &&
    value !== undefined &&
    value.trim().length === 0

  const validateTags = (value: string[]) =>
    statusForm && value !== null && value !== undefined && value.length === 0

  const validateInteger = (value: any) =>
    statusForm &&
    value !== null &&
    value !== undefined &&
    Number.parseInt(String(value)) < 0

  const handleChange = target => {
    const { name, value } = target
    dispatch({ type: ActionTypes.SET_USER, name, value })
  }

  const handleKeyDown = event => {
    switch (event.key) {
      case ',':
      case 'Enter': {
        event.preventDefault()
        event.stopPropagation()
        if (event.target.value.length > 0) {
          dispatch({ type: ActionTypes.SET_TAGS, value: event.target.value })
        }
        break
      }
      default:
    }
  }

  const validateUser = () => {
    const code = Number.parseInt(String(user.role))
    let isValid = true
    isValid = isValid && user.name.trim().length > 0
    isValid = isValid && user.email.trim().length > 0
    isValid = isValid && code > -1
    isValid = isValid && user.external_code.trim().length > 0
    isValid = isValid && user.tags.length > 0
    dispatch({ type: ActionTypes.VALIDET_INPUT, isValid })
    return isValid
  }

  const handleChangeTags = allTags => {
    dispatch({ type: ActionTypes.SET_ALL_TAGS, name: null, value: allTags })
  }

  const updateUserForm = (user: IUser) => {
    dispatch({ type: ActionTypes.UPDATE_USER, value: user })
  }

  const statusSubmit = type => {
    dispatch({ type: ActionTypes.STATUS, value: type })
  }

  const clearForm = () => {
    dispatch({ type: ActionTypes.USER_RESET })
  }

  const statusError = () => {
    dispatch({ type: ActionTypes.ERROR })
  }

  return {
    user,
    isValid,
    status,
    handleChange,
    handleChangeTags,
    validateString,
    validateTags,
    validateInteger,
    clearForm,
    updateUserForm,
    handleKeyDown,
    validateUser,
    statusSubmit,
    statusError,
    error
  }
}

const FormProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <FormContext.Provider value={[state, dispatch]}>
      {children}
    </FormContext.Provider>
  )
}

export { FormContext, FormProvider }
