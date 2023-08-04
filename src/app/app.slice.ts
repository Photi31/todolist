import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import { toast } from 'react-toastify'

const slice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    isAppInitialized: false,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
    setIsAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
      state.isAppInitialized = action.payload.isAppInitialized
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        action => {
          return action.type.endsWith('/pending')
        },
        state => {
          state.isLoading = true
        }
      )
      .addMatcher(
        action => {
          return action.type.endsWith('/fulfilled')
        },
        state => {
          state.isLoading = false
        }
      )
      .addMatcher(
        action => {
          return action.type.endsWith('/rejected')
        },
        (state, action) => {
          // debugger;
          const err = action.payload.error as Error | AxiosError<{ error: string }>

          if (isAxiosError(err)) {
            const error = err.response ? err.response.data.error : err.message

            toast.error(error)
          } else {
            toast.error(`Native error ${err.message}`)
          }
          state.isLoading = false
        }
      )
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
