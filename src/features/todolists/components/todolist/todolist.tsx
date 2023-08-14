import { MouseEvent, useState } from 'react'

import { useAppDispatch } from 'common/hooks'
import { Tasks } from 'features/tasks/components/tasks/tasks.tsx'
import s from 'features/todolists/components/todolists/todolists.module.scss'
import { TodolistType } from 'features/todolists/todolists.api.ts'
import { todolistThunk } from 'features/todolists/todolists.slice.ts'
import { Plus } from 'images/icons/plus.tsx'
import { Trash } from 'images/icons/trash.tsx'
import { Button } from 'ui/button'
import { Typography } from 'ui/typography'

type TodolistPropsType = {
  tl: TodolistType
}

export const Todolist = ({ tl }: TodolistPropsType) => {
  const dispatch = useAppDispatch()
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

  return (
    <div className={s.todolist} key={tl.id} id={tl.id}>
      <div className={s.header}>
        <Typography variant={'h2'} className={s.title}>
          {tl.title}
        </Typography>
        {tl.order}
        <Button variant="tertiary" onClick={deleteTodolist}>
          <Trash />
        </Button>
      </div>
      <div className={s.main}>
        <Tasks todolistId={tl.id} />
        <Button variant="tertiary" fullWidth={true}>
          <Plus />
          Add Task
        </Button>
      </div>
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
  )
}
