import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { Loader } from 'common/loaders/loader/loader.tsx'
import { Todolist } from 'features/todolists/components/todolist/todolist.tsx'
import { todolistThunk } from 'features/todolists/todolists.slice.ts'
import { Plus } from 'images/icons/plus.tsx'
import { Button } from 'ui/button'
import { TextField } from 'ui/textField'

import s from './todolists.module.scss'
export const Todolists = () => {
  const todolists = useAppSelector(state => state.todolist.todolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(todolistThunk.getTodolists())
  }, [])

  const addTodolist = (title: string) => {
    dispatch(todolistThunk.addTodolist(title)).then(() => {
      dispatch(todolistThunk.getTodolists())
    })
  }

  return (
    <div className={s.container}>
      {todolists ? (
        <div>
          <TextField
            className={s.search}
            type="search"
            placeholder="filter by keyword or by field"
          />
          <Button variant="primary" className={s.addTodolist} onClick={() => addTodolist('0101')}>
            <Plus />
            Add Todolist
          </Button>
          <div className={s.todolistsContainer}>
            {todolists.map(tl => {
              return <Todolist key={tl.id} tl={tl} />
            })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}
