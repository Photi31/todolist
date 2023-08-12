import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { appActions } from 'app/app.slice.ts'
import { createAppAsyncThunk, thunkTryCatch } from 'common/utils'
import {
  ArgLoginType,
  authApi,
  LoginResponseType,
  LogoutResponseType,
  MeResponseType,
} from 'features/auth/auth.api.ts'

const me = createAppAsyncThunk<{ meResponse: MeResponseType }, void>(
  'auth/me',
  async (arg: void, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.me()

      return { meResponse: res.data }
    })
  }
)
const login = createAppAsyncThunk<{ loginResponse: LoginResponseType }, ArgLoginType>(
  'auth/login',
  async (arg: ArgLoginType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.login(arg)

      return { loginResponse: res.data }
    })
  }
)
const logout = createAppAsyncThunk<{ logoutResponse: LogoutResponseType }, void>(
  'auth/logout',
  async () => {
    const res = await authApi.logout()

    return { logoutResponse: res.data }
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: {
    userId: null as number | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(me.fulfilled, (state, action) => {
        if (action.payload.meResponse.resultCode === 0) {
          state.userId = action.payload.meResponse.data.id
        } else {
          toast.error(action.payload.meResponse.messages[0])
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.loginResponse.resultCode === 0) {
          state.userId = action.payload.loginResponse.data.userId
        } else {
          toast.error(action.payload.loginResponse.messages[0])
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        if (action.payload.logoutResponse.resultCode === 0) {
          state.userId = null
        } else {
          toast.error(action.payload.logoutResponse.messages[0])
        }
      })
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {
  login,
  me,
  logout,
}
