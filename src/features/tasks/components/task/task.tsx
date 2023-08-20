import { useState } from 'react'

import { useAppDispatch } from 'common/hooks'
import { ChangeTask, TaskType } from 'features/tasks/tasks.api.ts'
import { taskThunk } from 'features/tasks/tasks.slice.ts'
import { MenuDot } from 'images/icons/menuDot.tsx'
import { Trash } from 'images/icons/trash.tsx'
import { Button } from 'ui/button'
import { Checkbox } from 'ui/checkBox'
import s1 from 'ui/checkBox/checkBox.module.scss'
import { DropDownMenu } from 'ui/dropDownMenu/dropDownMenu.tsx'
import {
  ChangeTaskFormType,
  ChangeTaskModal,
} from 'ui/modalsForComponents/changeTaskModal/changeTaskModal.tsx'
import { Typography } from 'ui/typography'

import s from './task.module.scss'

type TaskPropstype = {
  task: TaskType
  todolistId: string
}
export const Task = ({ task, todolistId }: TaskPropstype) => {
  const dispatch = useAppDispatch()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [activeModal, setActiveModal] = useState<boolean>(false)

  const menuHandler = () => {
    setOpenMenu(!openMenu)
  }

  const openChangeTaskModal = () => {
    setActiveModal(true)
  }

  const copyTask: ChangeTask = {
    description: task.description,
    title: task.title,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
  }

  const changeTask = (changedTask: ChangeTask) => {
    dispatch(
      taskThunk.changeTask({
        todolistId,
        taskId: task.id,
        task: { ...copyTask, ...changedTask },
      })
    ).then(() => {
      dispatch(taskThunk.getTasks({ todolistId }))
    })
  }
  const changeTaskChecked = () => {
    const status = task.status === 1 ? 0 : 1

    changeTask({ status, title: task.title })
  }

  const deleteTask = () => {
    dispatch(taskThunk.deleteTask({ todolistId, taskId: task.id })).then(() => {
      dispatch(taskThunk.getTasks({ todolistId }))
    })
  }

  const onSubmit = (data: ChangeTaskFormType) => {
    changeTask(data)
    setOpenMenu(false)
  }

  const priorityColor = () => {
    switch (task.priority) {
      case 1:
        return '#ff8099'
      case 2:
        return '#640'
      case 3:
        return '#704ecc'
      case 4:
        return '#234e99'
      default:
        return '#0a6638'
    }
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
        <div className={s1.buttonWrapper} onClick={menuHandler}>
          <MenuDot className={s.menu} />
        </div>
        <div className={s1.buttonWrapper} onClick={deleteTask}>
          <Trash className={s.deleteTask} />
        </div>
        {openMenu && (
          <DropDownMenu>
            {task.description && (
              <div className={s.item}>
                <Typography variant="caption">{task.description}</Typography>
              </div>
            )}
            <div className={s.item}>
              <Typography variant="subtitle2">Priority</Typography>
              <Typography
                className={s.itemValue}
                variant="body2"
                style={{ background: priorityColor() }}
              >
                {task.priority}
              </Typography>
            </div>
            {task.deadline && (
              <div className={s.item}>
                <Typography variant="subtitle2">Deadline</Typography>
                <Typography className={s.itemValue} variant="body2">
                  {task.deadline}
                </Typography>
              </div>
            )}
            <Button
              className={s.changeTask}
              variant="primary"
              fullWidth={true}
              onClick={openChangeTaskModal}
            >
              Change Task
            </Button>
          </DropDownMenu>
        )}
        <ChangeTaskModal
          task={task}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}
