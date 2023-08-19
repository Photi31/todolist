import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { TaskType } from 'features/tasks/tasks.api.ts'
import { Close } from 'images/icons/close.tsx'
import { Button } from 'ui/button'
import { ControlledTextField } from 'ui/controlled/controlledTextField.tsx'
import { Modal } from 'ui/modal/modal.tsx'
import s from 'ui/modalsForComponents/addTodolistModal/addTodolistModal.module.scss'
import { Typography } from 'ui/typography'

const schema = z.object({
  description: z.string().trim(),
  title: z.string().trim().max(100, 'Title must be less than 100 characters'),
  priority: z.coerce
    .number()
    .positive('Task priority must be positive number')
    .lte(5, 'Task priority must be less than 5'),
})

export type ChangeTaskFormType = z.infer<typeof schema>

type ChangeTaskModalPropsType = {
  task: TaskType
  activeModal: boolean
  setActiveModal: (active: boolean) => void
  onSubmit: (data: ChangeTaskFormType) => void
}
export const ChangeTaskModal = ({
  task,
  activeModal,
  setActiveModal,
  onSubmit,
}: ChangeTaskModalPropsType) => {
  const { control, handleSubmit } = useForm<ChangeTaskFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      description: `${task.description}` || 'Enter description for task',
      title: `${task.title}`,
      priority: task.priority,
    },
  })

  const closeButtonClick = () => {
    setActiveModal(false)
  }

  const onSubmitForm = (data: ChangeTaskFormType) => {
    onSubmit(data)
    setActiveModal(false)
  }

  //todo fix bug with close modal - clear textField

  return (
    <Modal active={activeModal} setActive={setActiveModal}>
      <form className={s.form} onSubmit={handleSubmit(onSubmitForm)}>
        <Typography variant="subtitle1" className={s.modalTitle}>
          Change Task
        </Typography>
        <ControlledTextField label="Title" name="title" control={control} type="text" />
        <ControlledTextField label="Description" name="description" control={control} type="text" />
        <ControlledTextField label="Priority" name="priority" control={control} type="text" />
        <Button fullWidth={true} type={'submit'} className={s.button}>
          Change Task
        </Button>
      </form>
      <Button variant="tertiary" className={s.closeModalButton} onClick={closeButtonClick}>
        <Close />
      </Button>
    </Modal>
  )
}
