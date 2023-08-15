import { ReactNode } from 'react'

import { clsx } from 'clsx'

import s from 'ui/modal/modal.module.scss'

type ModalPropsType = {
  active: boolean
  children: ReactNode
  setActive: (active: boolean) => void
}

export const Modal = ({ active, setActive, children }: ModalPropsType) => {
  const classNames = {
    modal: clsx(s.modal, active && s.active),
    modalContent: clsx(s.modalContent, active && s.active),
  }

  return (
    <div className={classNames.modal} onClick={() => setActive(false)}>
      <div className={classNames.modalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
