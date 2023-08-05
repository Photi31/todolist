import { instance } from 'common/api'
import { ResponseType } from 'features/auth/auth.api.ts'

export const todolistsApi = {
  getTodolists: (arg: {}) => {
    return instance.get<TodolistType[]>('todo-lists', arg)
  },
  addTodolist: (title: string) => {
    return instance.post<AddTodolistResponseType>('todo-lists', title)
  },
  deleteTodolist: (todolistId: string) => {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
  },
  changeTodolistTitle: ({ todolistId, title }: ChangeTodolistTitleType) => {
    return instance.put<any>(`todo-lists/${todolistId}`, title)
  },
  reorderTodolist: ({ todolistId, putAfterItemId }: ReorderTodolistType) => {
    return instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}/reorder`, putAfterItemId)
  },
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type ChangeTodolistTitleType = {
  todolistId: string
  title: string
}

export type ReorderTodolistType = {
  todolistId: string
  putAfterItemId: string
}

export type AddTodolistResponseType = ResponseType<{ item: TodolistType }>
