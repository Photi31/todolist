import { MouseEvent, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { Tasks } from 'features/tasks/components/tasks/tasks.tsx'
import s from 'features/todolists/components/todolists/todolists.module.scss'
import { TodolistType } from 'features/todolists/todolists.api.ts'
import { todolistActions, todolistThunk } from 'features/todolists/todolists.slice.ts'
import { Trash } from 'images/icons/trash.tsx'
import { Button } from 'ui/button'
import { EditableSpan } from 'ui/editableSpan/editableSpan.tsx'

type TodolistPropsType = {
  tl: TodolistType
}

export const Todolist = ({ tl }: TodolistPropsType) => {
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector(state => state.task.searchValue)
  const emptyTodolist = useAppSelector(
    state => state.todolist.emptyTodolistAfterFiltering
  ).includes(tl.id)
  const [activeButton, setActiveButton] = useState<string>('All')

  const variantButton = (nameButton: string) => {
    return activeButton === nameButton ? 'primary' : 'secondary'
  }

  const sortButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setActiveButton(e.currentTarget.innerHTML)
  }

  const deleteTodolist = () => {
    dispatch(todolistThunk.deleteTodolist(tl.id)).then(() => {
      dispatch(todolistThunk.getTodolists())
    })
  }

  const onChangeTitle = (newTitle: string) => {
    dispatch(todolistThunk.changeTodolistTitle({ todolistId: tl.id, title: newTitle })).then(() => {
      dispatch(todolistThunk.getTodolists())
    })
  }

  if (!searchValue) {
    if (emptyTodolist) {
      dispatch(
        todolistActions.deleteEmptyTodolistAfterFiltering({
          emptyTodolistAfterFiltering: tl.id,
        })
      )
    }
  }

  return (
    <>
      {!emptyTodolist && (
        <div className={s.todolist} key={tl.id} id={tl.id}>
          <div className={s.header}>
            <EditableSpan todolistTitle={tl.title} onChangeTitle={onChangeTitle} />
            <Button variant="tertiary" onClick={deleteTodolist}>
              <Trash />
            </Button>
          </div>
          <Tasks todolistId={tl.id} activeButtonFiltration={activeButton} />
          <div className={s.footer}>
            <Button variant={variantButton('All')} onClick={sortButtonClick}>
              All
            </Button>
            <Button variant={variantButton('Active')} onClick={sortButtonClick}>
              Active
            </Button>
            <Button variant={variantButton('Completed')} onClick={sortButtonClick}>
              Completed
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
