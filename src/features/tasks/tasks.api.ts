import { instance } from 'common/api'
import { ResponseType } from 'features/auth/auth.api.ts'

export const tasksApi = {
  getTasks: (todolistId: string, queryParams?: { count: number; page: number }) => {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`, {
      params: queryParams,
    })
  },
  addTask: (todolistId: string, title: string) => {
    return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, title)
  },
  deleteTask: (todolistId: string, taskId: string) => {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTask: (todolistId: string, taskId: string, task: ChangeTask) => {
    return instance.put<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      task
    )
  },
  reorderTask: (todolistId: string, taskId: string, putAfterItemId: string) => {
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

export type GetTasksResponseType = {
  items: TaskType[]
  totalCount: number
  error: string
}

export type ChangeTask = Omit<TaskType, 'id' | 'todoListId' | 'order' | 'addedDate'>
