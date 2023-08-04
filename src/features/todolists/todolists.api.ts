import { instance } from 'common/api'
import { ResponseType } from 'features/auth/auth.api.ts'

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<TodolistType[]>('todo-lists')
  },
  reorderTodolist: (todolistId: string, putAfterItemId: string) => {
    return instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}/reorder`, putAfterItemId)
  },
  addTodolist: (title: string) => {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', title)
  },
  deleteTodolist: (todolistId: string) => {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
  },
  changeTodolistTitle: (todolistId: string, title: string) => {
    return instance.put(`todo-lists/${todolistId}`, title)
  },
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
