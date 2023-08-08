import { Todolist } from 'features/todolists/components/todolist/todolist.tsx'
import { TextField } from 'ui/textField'

import s from './todolists.module.scss'
export const Todolists = () => {
  const todolists = [
    {
      id: '1',
      title: 'First TODO',
      addedDate: '07.08.2023',
      order: 1,
    },
    {
      id: '2',
      title: 'Second TODO',
      addedDate: '08.08.2023',
      order: 2,
    },
  ]

  return (
    <div className={s.container}>
      <TextField className={s.search} type="search" placeholder="filter by keyword or by field" />
      <div className={s.todolistsContainer}>
        {todolists.map(todo => {
          return <Todolist key={todo.id} todo={todo} />
        })}
      </div>
    </div>
  )
}
