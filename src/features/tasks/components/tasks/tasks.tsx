import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { LinearProgress } from 'common/loaders/linearProgress/linearProgress.tsx'
import { Task } from 'features/tasks/components/task/task.tsx'
import { taskThunk } from 'features/tasks/tasks.slice.ts'

import s from './tasks.module.scss'

type TasksPropsType = {
  todolistId: string
}

export const Tasks = (props: TasksPropsType) => {
  const tasks = useAppSelector(state => state.task.tasks[props.todolistId])
  const taskIsLoading = useAppSelector(state => state.task.taskIsLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(taskThunk.getTasks({ todolistId: props.todolistId }))
  }, [])

  return (
    <div className={s.tasksContainer}>
      {!taskIsLoading ? (
        <div>
          {tasks &&
            tasks.map(task => {
              return <Task key={task.id} task={task} todolistId={props.todolistId} />
            })}
        </div>
      ) : (
        <LinearProgress />
      )}
    </div>
  )
}
