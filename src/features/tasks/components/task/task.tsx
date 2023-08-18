import { useAppDispatch } from 'common/hooks'
import { ChangeTask, TaskType } from 'features/tasks/tasks.api.ts'
import { taskThunk } from 'features/tasks/tasks.slice.ts'
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
  const dispatch = useAppDispatch()

  const copyTask: ChangeTask = {
    description: task.description,
    title: task.title,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
  }
  const changeTaskChecked = () => {
    const status = task.status === 1 ? 0 : 1

    dispatch(
      taskThunk.changeTask({
        todolistId,
        taskId: task.id,
        task: { ...copyTask, status: status },
      })
    ).then(() => {
      dispatch(taskThunk.getTasks({ todolistId }))
    })
  }

  const openMenu = () => {
    //todo menu for task
  }

  const deleteTask = () => {
    dispatch(taskThunk.deleteTask({ todolistId, taskId: task.id })).then(() => {
      dispatch(taskThunk.getTasks({ todolistId }))
    })
  }

  return (
    <div className={s.taskContainer}>
      <Checkbox
        id={task.id}
        checked={!!task.status}
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
