import { Action } from 'redux'
import { Dispatch } from 'redux'
import { Auth } from '../store/StoreTypes'

export interface AuthAppAction extends Action
{
  payload: Auth
}

export const SET_SESSION = 'SET_SESSION'
export const SET_NAME = 'SET_NAME'
export const SET_EMAIL = 'SET_EMAIL'
export const SET_REMEMBER = 'SET_REMEMBER'
export const SET_CSRF = 'SET_CSRF'
export const SET_PARAMS = 'SET_PARAMS'

export const setSession = (session) => async (dispatch: Dispatch): Promise<void> =>
{
  const data = {
    payload: {
      id: session.id,
      name: session.name
    }
  }
  dispatch({ type: SET_SESSION, data })
}

export const setName = (name) => async (dispatch: Dispatch): Promise<void> =>
{
  const data = {
    payload: {
      name
    }
  }
  dispatch({ type: SET_NAME, data })
}

export const setEmail = (email) => async (dispatch: Dispatch): Promise<void> =>
{
  const data = {
    payload: {
      email
    }
  }
  dispatch({ type: SET_EMAIL, data })
}


export const setRemember = (remember) => async (dispatch: Dispatch): Promise<void> =>
{
  const data = {
    payload: {
      remember
    }
  }
  dispatch({ type: SET_REMEMBER, data })
}


export const setCSRF = (csrf) => async (dispatch: Dispatch): Promise<void> =>
{
  const data = {
    payload: {
      csrf
    }
  }
  dispatch({ type: SET_CSRF, data })
}


export const setPrams = (request) => async (dispatch: Dispatch): Promise<void> =>
{
  const data = {
    payload: {
      request
    }
  }
  dispatch({ type: SET_PARAMS, data })
}
