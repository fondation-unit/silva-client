import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL, CLIENT_TOKEN_NAME } from '../config'
import { configHeaders } from '../cookies'
import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios'
import Cookies from 'js-cookie'
import { signOut, signIn, updateData, confirm } from '../slices/authSlice'


export interface User {
  user: {
    email?: string
    password?: string
    firstname?: string
    lastname?: string
    menu?: {}
  }
}

/**
 * User login action
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: User, thunkAPI) => {
    try {
      return await axios.post(`${API_URL}/login`, data).then((res: AxiosResponse) => {
        const headers = res.headers as AxiosResponseHeaders
        const data = res.data as AxiosResponse
        const authHeader = headers.get('Authorization') as string

        if (authHeader.startsWith('Bearer ')) {
          const accessToken = authHeader.substring(7, authHeader.length)
          Cookies.set(CLIENT_TOKEN_NAME, accessToken, { secure: true })
          localStorage.setItem("user", JSON.stringify(data.data))
        }

        return thunkAPI.dispatch(signIn(data.data))
      })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

/**
 * User logout action
 */
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_: () => void, thunkAPI) => {
    Cookies.remove(CLIENT_TOKEN_NAME)
    localStorage.removeItem("user")
    thunkAPI.dispatch(signOut())
  })

/**
 * Bounce the user to the callback location
 */
export const bounceUser = createAction(
  'auth/redirect',
  (callback: () => void) => {
    callback()

    return {
      payload: null
    }
  }
)

/**
 * User signup action
 */
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (data: User, thunkAPI) => {
    try {
      return await axios.post(`${API_URL}/signup`, data).then((res: AxiosResponse) => {
        const data = res.data as AxiosResponse
        return thunkAPI.dispatch(signIn(data.data))
      })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)

/**
 * Update user action
 */
export const updateUser = createAsyncThunk(
  'auth/update',
  async (data: User, thunkAPI) => {
    try {
      return await axios.patch(`${API_URL}/current_user`, data, configHeaders).then((res: AxiosResponse) => {
        const data = res.data as AxiosResponse
        localStorage.removeItem("user")
        localStorage.setItem("user", JSON.stringify(data.data))
        return thunkAPI.dispatch(updateData(data.data))
      })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)

/**
 * Confirm user action
 */
export const confirmUser = createAsyncThunk(
  'auth/confirm',
  async (confirmationToken: string, thunkAPI) => {
    try {
      return await axios.get(`${API_URL}/confirmation?confirmation_token=${confirmationToken}`).then(_ => {
        return thunkAPI.dispatch(confirm(true))
      })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.status.message)
    }
  }
)
