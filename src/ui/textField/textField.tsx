import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useEffect, useState } from 'react'

import clsx from 'clsx'

import { useDebounce } from 'common/hooks'
import { Close } from 'images/icons/close.tsx'
import { EyeSlash } from 'images/icons/eye-slash.tsx'
import { Eye } from 'images/icons/eye.tsx'
import { Search } from 'images/icons/search.tsx'

import { Typography } from '../typography'

import s from './textField.module.scss'

export type TextFieldType = {
  className?: string
  type?: 'password' | 'search' | 'text'
  label?: string
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
  searchFunction?: (inputValue: string) => void
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldType>((props, ref) => {
  const {
    errorMessage,
    className,
    disabled = false,
    placeholder = 'Input',
    type = 'text',
    label,
    searchFunction,
    ...rest
  } = props
  const [isEye, setIsEye] = useState<boolean>(true)
  const [inputValue, setInputValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(inputValue, 600)

  useEffect(() => {
    if (searchFunction) {
      searchFunction(inputValue)
    }
  }, [debouncedValue])

  const showError = !!errorMessage && errorMessage.length > 0
  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const clearHandler = () => {
    setInputValue('')
  }

  const Input = (type: string) => {
    switch (type) {
      case 'search': {
        return (
          <>
            <Search className={s.search} />
            <input
              disabled={disabled}
              className={classNames.input}
              placeholder={placeholder}
              value={inputValue}
              onChange={changeInputValue}
              ref={ref}
              {...rest}
            />
            <Close className={s.close} onClick={clearHandler} />
          </>
        )
      }
      case 'password': {
        return (
          <>
            <input
              disabled={disabled}
              type={isEye ? 'password' : 'text'}
              placeholder={placeholder}
              className={classNames.input}
              ref={ref}
              {...rest}
            />
            {isEye ? (
              <Eye onClick={() => setIsEye(false)} />
            ) : (
              <EyeSlash onClick={() => setIsEye(true)} />
            )}
          </>
        )
      }
      default: {
        return (
          <input
            disabled={disabled}
            type={'text'}
            placeholder={placeholder}
            className={classNames.input}
            ref={ref}
            {...rest}
          />
        )
      }
    }
  }

  const classNames = {
    container: clsx(s.container, className),
    wrapper: clsx(s.wrapper, disabled && s.disabled, errorMessage && s.error),
    label: clsx(s.label, disabled && s.disabled),
    error: s.error,
    input: clsx(s.input, errorMessage && s.error),
    clearButton: s.clearButton,
  }

  return (
    <div className={classNames.container}>
      <Typography variant={'body2'} as={'label'} className={classNames.label} color="inherit">
        {label && label}
        <Typography as="div" variant={'body1'}>
          <div className={classNames.wrapper}>{Input(type)}</div>
        </Typography>
        {errorMessage && <div className={s.error}>{errorMessage}</div>}
      </Typography>
      {showError && <Typography variant="error" errorMessage={errorMessage} showError={true} />}
    </div>
  )
})
