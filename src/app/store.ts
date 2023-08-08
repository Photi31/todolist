import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from 'app/app.slice.ts'
import { authReducer } from 'features/auth/auth.slice.ts'
import { taskReducer } from 'features/tasks/tasks.slice.ts'
import { todolistReducer } from 'features/todolists/todolists.slice.ts'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todolist: todolistReducer,
    task: taskReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
