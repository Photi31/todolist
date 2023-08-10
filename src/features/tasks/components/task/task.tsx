import { TaskType } from 'features/tasks/tasks.api.ts'
import { MenuDot } from 'images/icons/menuDot.tsx'
import { Trash } from 'images/icons/trash.tsx'
import { Checkbox } from 'ui/checkBox'
import s1 from 'ui/checkBox/checkBox.module.scss'

import s from './task.module.scss'

type TaskPropstype = {
  task: TaskType
  todolistId: string
}
export const Task = ({ task, todolistId }: TaskPropstype) => {
  const changeTaskChecked = () => {
    //todo dispatch checked
  }

  const openMenu = () => {
    //todo menu for task
  }

  const deleteTask = () => {
    //todo delete task
  }

  return (
    <div className={s.taskContainer}>
      <Checkbox
        id={task.id}
        checked={task.completed}
        label={task.title}
        onChange={changeTaskChecked}
      />
      <div className={s.menuBlock}>
        <div className={s1.buttonWrapper} onClick={openMenu}>
          <MenuDot className={s.menu} />
        </div>
        <div className={s1.buttonWrapper} onClick={deleteTask}>
          <Trash className={s.deleteTask} />
        </div>
      </div>
    </div>
  )
}
