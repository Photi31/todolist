import s from './tasks.module.scss'

type TasksPropsType = {
  todolistId: string
}

export const Tasks = (props: TasksPropsType) => {
  //todo request on task for todolist

  const tasks = [
    {
      description: 'bla bla bla',
      title: 'task 1',
      completed: false,
      status: 1,
      priority: 1,
      startDate: 'string',
      deadline: 'string',
      id: '11',
      todoListId: '1',
      order: 1,
      addedDate: 'string',
    },
    {
      description: 'bla bla bla',
      title: 'task 1',
      completed: false,
      status: 1,
      priority: 1,
      startDate: 'string',
      deadline: 'string',
      id: '21',
      todoListId: '1',
      order: 1,
      addedDate: 'string',
    },
  ]

  return <div className={s.tasksContainer}></div>
}
