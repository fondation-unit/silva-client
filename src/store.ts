import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cardsReducer from './slices/cardsSlice'
import scenariiSlice from './slices/scenariiSlice'
import logger from 'redux-logger'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
    scenarii: scenariiSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
