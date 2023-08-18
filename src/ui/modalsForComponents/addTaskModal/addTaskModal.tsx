import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch } from 'common/hooks'
import { taskThunk } from 'features/tasks/tasks.slice.ts'
import { Close } from 'images/icons/close.tsx'
import { Plus } from 'images/icons/plus.tsx'
import { Button } from 'ui/button'
import { ControlledTextField } from 'ui/controlled/controlledTextField.tsx'
import { Modal } from 'ui/modal/modal.tsx'
import s from 'ui/modalsForComponents/addTodolistModal/addTodolistModal.module.scss'
import { Typography } from 'ui/typography'

const schema = z.object({
  taskTitle: z
    .string()
    .trim()
    .nonempty('Enter title')
    .max(100, 'Title must be less than 100 characters'),
})

export type AddTaskFormType = z.infer<typeof schema>

type AddTaskModalPropsType = {
  todolistId: string
  activeModal: boolean
  setActiveModal: (active: boolean) => void
}

export const AddTaskModal = ({
  todolistId,
  activeModal,
  setActiveModal,
}: AddTaskModalPropsType) => {
  const dispatch = useAppDispatch()

  const { control, handleSubmit } = useForm<AddTaskFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      taskTitle: '',
    },
  })

  const onSubmit = (data: AddTaskFormType) => {
    dispatch(taskThunk.addTask({ todolistId: todolistId, title: data.taskTitle })).then(() => {
      setActiveModal(false)
      dispatch(taskThunk.getTasks({ todolistId }))
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
          Create new Task
        </Typography>
        <ControlledTextField
          placeholder={'Enter title for new task'}
          name="taskTitle"
          control={control}
          type="text"
        />
        <Button fullWidth={true} type={'submit'} className={s.button}>
          <Plus />
          Add new task
        </Button>
      </form>
      <Button variant="tertiary" className={s.closeModalButton} onClick={closeButtonClick}>
        <Close />
      </Button>
    </Modal>
  )
}
