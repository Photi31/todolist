import { createSlice } from '@reduxjs/toolkit'

import { createAppAsyncThunk, thunkTryCatch } from 'common/utils'
import { ResponseType } from 'features/auth/auth.api.ts'
import { taskActions } from 'features/tasks/tasks.slice.ts'
import {
  AddTodolistResponseType,
  ChangeTodolistTitleType,
  ReorderTodolistType,
  todolistsApi,
  TodolistType,
} from 'features/todolists/todolists.api.ts'

const getTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  'todolist/getTodolists',
  async () => {
    const res = await todolistsApi.getTodolists()

    return { todolists: res.data }
  }
)

const addTodolist = createAppAsyncThunk<{ addTodolistResponse: AddTodolistResponseType }, string>(
  'todolist/addTodolist',
  async (title: string, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.addTodolist(title)

      return { addTodolistResponse: res.data }
    })
  }
)

const deleteTodolist = createAppAsyncThunk<{ deleteTodolistResponse: ResponseType<{}> }, string>(
  'todolist/deleteTodolist',
  async (todolistId: string, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.deleteTodolist(todolistId)

      return { deleteTodolistResponse: res.data }
    })
  }
)

const changeTodolistTitle = createAppAsyncThunk<
  { changeTodolistTitleResponse: any },
  ChangeTodolistTitleType
>('todolist/changeTodolistTitle', async (arg: ChangeTodolistTitleType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await todolistsApi.changeTodolistTitle(arg)

    return { changeTodolistTitleResponse: res.data }
  })
})

const reorderTodolist = createAppAsyncThunk<
  { reorderTodolistResponse: ResponseType<{}> },
  ReorderTodolistType
>('todolist/reorderTodolist', async (arg: ReorderTodolistType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await todolistsApi.reorderTodolist(arg)

    return { reorderTodolistResponse: res.data }
  })
})

const slice = createSlice({
  name: 'todolist',
  initialState: {
    todolists: null as TodolistType[] | null,
    anyChangeTodolist: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTodolists.fulfilled, (state, action) => {
      const todolists = action.payload.todolists

      state.todolists = todolists
      todolists.map(todo => {
        taskActions.setTodolistId(todo.id)
      })
      state.anyChangeTodolist = false
    })
    // .addCase(addTodolist.fulfilled, (state, action) => {
    //   if (action.payload.addTodolistResponse.resultCode === 0) {
    //     // todolistThunk.getTodolists()
    //     // state.anyChangeTodolist = true
    //   } else {
    //     toast.error(action.payload.addTodolistResponse.messages[0])
    //   }
    // })
    // .addCase(deleteTodolist.fulfilled, (state, action) => {
    //   if (action.payload.deleteTodolistResponse.resultCode === 0) {
    //     state.anyChangeTodolist = true
    //   } else {
    //     toast.error(action.payload.deleteTodolistResponse.messages[0])
    //   }
    // })
    // .addCase(changeTodolistTitle.fulfilled, (state, action) => {
    //   if (action.payload.changeTodolistTitleResponse.resultCode === 0) {
    //     state.anyChangeTodolist = true
    //   } else {
    //     toast.error(action.payload.changeTodolistTitleResponse.messages[0])
    //   }
    // })
    // .addCase(reorderTodolist.fulfilled, (state, action) => {
    //   if (action.payload.reorderTodolistResponse.resultCode === 0) {
    //     state.anyChangeTodolist = true
    //   } else {
    //     toast.error(action.payload.reorderTodolistResponse.messages[0])
    //   }
    // })
  },
})

export const todolistReducer = slice.reducer
export const todolistActions = slice.actions

export const todolistThunk = {
  getTodolists,
  addTodolist,
  deleteTodolist,
  changeTodolistTitle,
  reorderTodolist,
}
