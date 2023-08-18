import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { LinearProgress } from 'common/loaders/linearProgress/linearProgress.tsx'
import { Task } from 'features/tasks/components/task/task.tsx'
import { taskThunk } from 'features/tasks/tasks.slice.ts'
import { Plus } from 'images/icons/plus.tsx'
import { Button } from 'ui/button'
import { AddTaskModal } from 'ui/modalsForComponents/addTaskModal/addTaskModal.tsx'

import s from './tasks.module.scss'

type TasksPropsType = {
  todolistId: string
}

export const Tasks = ({ todolistId }: TasksPropsType) => {
  const tasks = useAppSelector(state => state.task.tasks[todolistId])
  const taskIsLoading = useAppSelector(state => state.task.taskIsLoading)
  const dispatch = useAppDispatch()
  const [activeModal, setActiveModal] = useState<boolean>(false)

  useEffect(() => {
    dispatch(taskThunk.getTasks({ todolistId }))
  }, [])

  const openModal = () => {
    setActiveModal(true)
  }

  return (
    <div className={s.main}>
      {!taskIsLoading ? (
        <div className={s.tasksContainer}>
          {tasks &&
            tasks.map(task => {
              return <Task key={task.id} task={task} todolistId={todolistId} />
            })}
        </div>
      ) : (
        <LinearProgress />
      )}
      <Button variant="tertiary" fullWidth={true} onClick={openModal}>
        <Plus />
        Add Task
      </Button>
      <AddTaskModal
        todolistId={todolistId}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
    </div>
  )
}
