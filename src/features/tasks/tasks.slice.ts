import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { createAppAsyncThunk, thunkTryCatch } from 'common/utils'
import { ResponseType } from 'features/auth/auth.api.ts'
import {
  AddTaskArgType,
  AddTaskResponseType,
  ChangeTaskArgType,
  ChangeTaskResponseType,
  DeleteTaskArgType,
  GetTasksArgType,
  GetTasksResponseType,
  ReorderTaskArgType,
  tasksApi,
  TasksStateType,
} from 'features/tasks/tasks.api.ts'

const getTasks = createAppAsyncThunk<
  { getTasksResponse: GetTasksResponseType; todolistId: string },
  GetTasksArgType
>('task/getTasks', async (arg: GetTasksArgType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksApi.getTasks(arg)

    return { getTasksResponse: res.data, todolistId: arg.todolistId }
  })
})
const addTask = createAppAsyncThunk<{ addTaskResponse: AddTaskResponseType }, AddTaskArgType>(
  'task/addTask',
  async (arg: AddTaskArgType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.addTask(arg)

      return { addTaskResponse: res.data }
    })
  }
)
const deleteTask = createAppAsyncThunk<{ deleteTaskResponse: ResponseType<{}> }, DeleteTaskArgType>(
  'task/deleteTask',
  async (arg: DeleteTaskArgType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.deleteTask(arg)

      return { deleteTaskResponse: res.data }
    })
  }
)
const changeTask = createAppAsyncThunk<
  { changeTaskResponse: ChangeTaskResponseType },
  ChangeTaskArgType
>('task/changeTask', async (arg: ChangeTaskArgType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksApi.changeTask(arg)

    return { changeTaskResponse: res.data }
  })
})
const reorderTask = createAppAsyncThunk<
  { reorderTaskResponse: ResponseType<{}> },
  ReorderTaskArgType
>('task/reorderTask', async (arg: ReorderTaskArgType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksApi.reorderTask(arg)

    return { reorderTaskResponse: res.data }
  })
})

const slice = createSlice({
  name: 'task',
  initialState: {
    tasks: {} as TasksStateType,
    anyChangeTask: false,
  },
  reducers: {
    setTodolistId: (state, action) => {
      state.tasks = {
        ...state.tasks,
        [action.payload.todolistId]: [],
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        if (action.payload.getTasksResponse.items.length > 0) {
          state.tasks[action.payload.todolistId] = action.payload.getTasksResponse.items
          state.anyChangeTask = false
        } else {
          toast.error(action.payload.getTasksResponse.error)
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        if (action.payload.addTaskResponse.resultCode === 0) {
          state.anyChangeTask = true
        } else {
          toast.error(action.payload.addTaskResponse.messages[0])
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (action.payload.deleteTaskResponse.resultCode === 0) {
          state.anyChangeTask = true
        } else {
          toast.error(action.payload.deleteTaskResponse.messages[0])
        }
      })
      .addCase(changeTask.fulfilled, (state, action) => {
        if (action.payload.changeTaskResponse.resultCode === 0) {
          state.anyChangeTask = true
        } else {
          toast.error(action.payload.changeTaskResponse.messages[0])
        }
      })
      .addCase(reorderTask.fulfilled, (state, action) => {
        if (action.payload.reorderTaskResponse.resultCode === 0) {
          state.anyChangeTask = true
        } else {
          toast.error(action.payload.reorderTaskResponse.messages[0])
        }
      })
  },
})

export const taskReducer = slice.reducer

export const taskActions = slice.actions

export const taskThunk = {
  getTasks,
  addTask,
  deleteTask,
  changeTask,
  reorderTask,
}
