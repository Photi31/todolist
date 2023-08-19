import { ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './dropDownMenu.module.scss'

export type DropDownMenuType = {
  className?: string
  children: ReactNode
}

export const DropDownMenu = (props: DropDownMenuType) => {
  const { className, children } = props

  const classNames = {
    menu: clsx(s.menu, className),
  }

  return (
    <div className={classNames.menu}>
      <span className={s.triangle} />
      {children}
    </div>
  )
}
