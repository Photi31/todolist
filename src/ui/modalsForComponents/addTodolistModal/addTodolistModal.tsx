import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch } from 'common/hooks'
import { todolistThunk } from 'features/todolists/todolists.slice.ts'
import { Close } from 'images/icons/close.tsx'
import { Plus } from 'images/icons/plus.tsx'
import { Button } from 'ui/button'
import { ControlledTextField } from 'ui/controlled/controlledTextField.tsx'
import { Modal } from 'ui/modal/modal.tsx'
import s from 'ui/modalsForComponents/addTodolistModal/addTodolistModal.module.scss'
import { Typography } from 'ui/typography'

const schema = z.object({
  todolistTitle: z
    .string()
    .trim()
    .nonempty('Enter title')
    .max(100, 'Title must be less than 100 characters'),
})

export type AddTodolistFormType = z.infer<typeof schema>

type AddTodolistModalPropsType = {
  activeModal: boolean
  setActiveModal: (active: boolean) => void
}

export const AddTodolistModal = ({ activeModal, setActiveModal }: AddTodolistModalPropsType) => {
  const dispatch = useAppDispatch()

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

  const closeButtonClick = () => {
    setActiveModal(false)
  }

  //todo fix bug with close modal - clear textField

  return (
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
      <Button variant="tertiary" className={s.closeModalButton} onClick={closeButtonClick}>
        <Close />
      </Button>
    </Modal>
  )
}
