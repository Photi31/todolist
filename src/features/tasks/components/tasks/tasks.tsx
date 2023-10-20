import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { LinearProgress } from 'common/loaders/linearProgress/linearProgress.tsx'
import { Task } from 'features/tasks/components/task/task.tsx'
import { taskThunk } from 'features/tasks/tasks.slice.ts'
import { todolistActions } from 'features/todolists/todolists.slice.ts'
import { Plus } from 'images/icons/plus.tsx'
import { Button } from 'ui/button'
import { AddTaskModal } from 'ui/modalsForComponents/addTaskModal/addTaskModal.tsx'

import s from './tasks.module.scss'

type TasksPropsType = {
  todolistId: string
  activeButtonFiltration: string
}

export const Tasks = ({ todolistId, activeButtonFiltration }: TasksPropsType) => {
  const tasks = useAppSelector(state => state.task.tasks[todolistId])
  const taskIsLoading = useAppSelector(state => state.task.taskIsLoading)
  const searchValue = useAppSelector(state => state.task.searchValue)
  const dispatch = useAppDispatch()
  const [activeModal, setActiveModal] = useState<boolean>(false)

  useEffect(() => {
    dispatch(taskThunk.getTasks({ todolistId }))
  }, [])

  const openModal = () => {
    setActiveModal(true)
  }

  let filtratedTask = tasks

  if (activeButtonFiltration === 'Active') {
    filtratedTask = tasks.filter(t => t.status === 0)
  }
  if (activeButtonFiltration === 'Completed') {
    filtratedTask = tasks.filter(t => t.status === 1)
  }

  if (searchValue.length > 0) {
    filtratedTask = filtratedTask?.filter(t => t.title?.indexOf(searchValue) > -1)
    if (filtratedTask.length === 0) {
      dispatch(
        todolistActions.setEmptyTodolistAfterFiltering({ emptyTodolistAfterFiltering: todolistId })
      )
    }
  }

  return (
    <div className={s.main}>
      {!taskIsLoading ? (
        <div className={s.tasksContainer}>
          {filtratedTask &&
            filtratedTask.map(task => {
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
