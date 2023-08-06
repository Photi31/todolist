import { instance } from 'common/api'
import { ResponseType } from 'features/auth/auth.api.ts'

export const tasksApi = {
  getTasks: ({ todolistId, queryParams }: GetTasksArgType) => {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`, {
      params: queryParams,
    })
  },
  addTask: ({ todolistId, title }: AddTaskArgType) => {
    return instance.post<AddTaskResponseType>(`/todo-lists/${todolistId}/tasks`, title)
  },
  deleteTask: ({ todolistId, taskId }: DeleteTaskArgType) => {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTask: ({ todolistId, taskId, task }: ChangeTaskArgType) => {
    return instance.put<ChangeTaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, task)
  },
  reorderTask: ({ todolistId, taskId, putAfterItemId }: ReorderTaskArgType) => {
    return instance.put<ResponseType<{}>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      putAfterItemId
    )
  },
}

export type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type GetTasksArgType = {
  todolistId: string
  queryParams?: {
    count: number
    page: number
  }
}
export type AddTaskArgType = {
  todolistId: string
  title: string
}
export type DeleteTaskArgType = {
  todolistId: string
  taskId: string
}
export type ChangeTaskArgType = {
  todolistId: string
  taskId: string
  task: ChangeTask
}
export type ReorderTaskArgType = {
  todolistId: string
  taskId: string
  putAfterItemId: string
}

export type GetTasksResponseType = {
  items: TaskType[]
  totalCount: number
  error: string
}
export type AddTaskResponseType = ResponseType<{ item: TaskType }>
export type ChangeTaskResponseType = ResponseType<{ item: TaskType }>

export type ChangeTask = Omit<TaskType, 'id' | 'todoListId' | 'order' | 'addedDate'>
