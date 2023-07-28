import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  children?: ReactNode
  as?: T
  variant?: string
  fullWidth?: boolean
  onClick?: () => void
} & ComponentPropsWithoutRef<'button'>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    className,
    as: Component = 'button',
    onClick,
    children,
    ...rest
  } = props

  const classNames = {
    button: clsx(s[variant], fullWidth && s.fullWidth),
  }

  return (
    <Component onClick={onClick} className={classNames.button} {...rest}>
      {children}
    </Component>
  )
}
