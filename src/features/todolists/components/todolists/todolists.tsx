import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { Loader } from 'common/loaders/loader/loader.tsx'
import { Todolist } from 'features/todolists/components/todolist/todolist.tsx'
import { todolistThunk } from 'features/todolists/todolists.slice.ts'
import { Close } from 'images/icons/close.tsx'
import { Plus } from 'images/icons/plus.tsx'
import { Button } from 'ui/button'
import { ControlledTextField } from 'ui/controlled/controlledTextField.tsx'
import { Modal } from 'ui/modalWindow/modal.tsx'
import { TextField } from 'ui/textField'
import { Typography } from 'ui/typography'

import s from './todolists.module.scss'

const schema = z.object({
  todolistTitle: z
    .string()
    .trim()
    .nonempty('Enter title')
    .max(100, 'Title must be less than 100 characters'),
})

export type AddTodolistFormType = z.infer<typeof schema>

export const Todolists = () => {
  const todolists = useAppSelector(state => state.todolist.todolists)
  const dispatch = useAppDispatch()
  const [activeModal, setActiveModal] = useState<boolean>(false)

  useEffect(() => {
    dispatch(todolistThunk.getTodolists())
  }, [])

  const { control, handleSubmit } = useForm<AddTodolistFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      todolistTitle: '',
    },
  })

  const onSubmit = (data: AddTodolistFormType) => {
    dispatch(todolistThunk.addTodolist(data.todolistTitle)).then(() => {
      setActiveModal(false)
      dispatch(todolistThunk.getTodolists())
    })
  }

  const openModal = () => {
    setActiveModal(true)
  }

  return (
    <div className={s.container}>
      <TextField className={s.search} type="search" placeholder="filter by keyword or by field" />
      <Button variant="primary" className={s.addTodolist} onClick={openModal}>
        <Plus />
        Add Todolist
      </Button>
      {todolists ? (
        <div className={s.todolistsContainer}>
          {todolists.map(tl => {
            return <Todolist key={tl.id} tl={tl} />
          })}
        </div>
      ) : (
        <Loader />
      )}
      <Modal active={activeModal} setActive={setActiveModal}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="subtitle1" className={s.modalTitle}>
            Create new Todolist
          </Typography>
          <ControlledTextField
            placeholder={'Enter title for new todolist'}
            name="todolistTitle"
            control={control}
            type="text"
          />
          <Button fullWidth={true} type={'submit'}>
            <Plus />
            Add new todolist
          </Button>
        </form>
        <Button
          variant="tertiary"
          className={s.closeModalButton}
          onClick={() => setActiveModal(false)}
        >
          <Close />
        </Button>
      </Modal>
    </div>
  )
}
