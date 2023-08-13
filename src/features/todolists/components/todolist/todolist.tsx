import { MouseEvent, useState } from 'react'

import { Tasks } from 'features/tasks/components/tasks/tasks.tsx'
import s from 'features/todolists/components/todolists/todolists.module.scss'
import { TodolistType } from 'features/todolists/todolists.api.ts'
import { MenuDot } from 'images/icons/menuDot.tsx'
import { Plus } from 'images/icons/plus.tsx'
import { Button } from 'ui/button'
import { Typography } from 'ui/typography'

type TodolistPropsType = {
  tl: TodolistType
}

export const Todolist = ({ tl }: TodolistPropsType) => {
  const [activeButton, setActiveButton] = useState<string>('All')

  const variantButton = (nameButton: string) => {
    return activeButton === nameButton ? 'primary' : 'secondary'
  }

  const sortButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setActiveButton(e.currentTarget.innerHTML)
  }

  return (
    <div className={s.todolist} key={tl.id} id={tl.id}>
      <div className={s.header}>
        <Typography variant={'h2'} className={s.title}>
          {tl.title}
        </Typography>
        {tl.order}
        <Button variant="tertiary">
          <MenuDot />
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
