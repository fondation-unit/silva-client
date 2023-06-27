import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL, CLIENT_TOKEN_NAME } from '../config'
import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios'
import type { User } from '../types'
import Cookies from 'js-cookie'
import { signOut, setEmail } from '../slices/authSlice'

/**
 * User login action
 */
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: User, thunkAPI) => {
    try {
      return await axios.post(`${API_URL}/login`, data).then((res: AxiosResponse) => {
        const headers = res.headers as AxiosResponseHeaders
        const data = res.data as AxiosResponse
        const authHeader = headers.get('Authorization') as string

        if (authHeader.startsWith('Bearer ')) {
          const accessToken = authHeader.substring(7, authHeader.length)
          Cookies.set(CLIENT_TOKEN_NAME, accessToken, { secure: true })
          localStorage.setItem("user", data.data.email)
        }

        thunkAPI.dispatch(setEmail(data.data.email))
      })
    } catch (error) {
      console.log(error)
      return {}
    }
  }
)

/**
 * User logout action
 */
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_: () => void, thunkAPI) => {
    Cookies.remove(CLIENT_TOKEN_NAME)
    localStorage.removeItem("user")
    thunkAPI.dispatch(signOut())
  })

/**
 * Bounce the user to the callback location
 */
export const bounceUser = createAction(
  'user/redirect',
  (callback: () => void) => {
    callback()

    return {
      payload: null
    }
  }
)
