import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { Loader } from 'common/loaders/loader/loader.tsx'
import { taskActions } from 'features/tasks/tasks.slice.ts'
import { Todolist } from 'features/todolists/components/todolist/todolist.tsx'
import { todolistThunk } from 'features/todolists/todolists.slice.ts'
import { Plus } from 'images/icons/plus.tsx'
import { Button } from 'ui/button'
import { AddTodolistModal } from 'ui/modalsForComponents/addTodolistModal/addTodolistModal.tsx'
import { TextField } from 'ui/textField'

import s from './todolists.module.scss'

export const Todolists = () => {
  const todolists = useAppSelector(state => state.todolist.todolists)
  const dispatch = useAppDispatch()
  const [activeModal, setActiveModal] = useState<boolean>(false)

  useEffect(() => {
    dispatch(todolistThunk.getTodolists())
  }, [])

  const openModal = () => {
    setActiveModal(true)
  }

  const searchTask = (inputValue: string) => {
    dispatch(taskActions.setSearchValue({ searchValue: inputValue }))
  }

  return (
    <div className={s.container}>
      <TextField
        className={s.search}
        type="search"
        placeholder="filter tasks by keyword"
        searchFunction={searchTask}
      />
      <Button variant="primary" className={s.addTodolist} onClick={openModal}>
        <Plus />
        Add Todolist
      </Button>
      {todolists ? (
        <div className={s.todolistsContainer}>
          {todolists.map(tl => {
            return <Todolist key={tl.id} tl={tl} />
          })}
        </div>
      ) : (
        <Loader />
      )}
      <AddTodolistModal activeModal={activeModal} setActiveModal={setActiveModal} />
    </div>
  )
}
