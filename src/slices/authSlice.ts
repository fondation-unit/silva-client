import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../actions/authActions'
import { AuthState } from '../types'

const initialState: AuthState = {
  isAuthenticated: false,
  email: null
}

/**
 * Auth slice containing the reducers
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.email = action.payload
    },
    signOut: (state) => {
      state.isAuthenticated = false
      state.email = null
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true
    })
  }
})

// Action creators are generated for each case reducer function
export const { signIn, signOut, setEmail } = authSlice.actions

export default authSlice.reducer
