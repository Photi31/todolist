import { ChangeEvent, memo, useState, KeyboardEvent } from 'react'

import { TextField } from 'ui/textField'
import { Typography } from 'ui/typography'

import s from './editableSpan.module.scss'

type EditableSpanPropsType = {
  todolistTitle: string
  onChangeTitle: (newValue: string) => void
}

export const EditableSpan = memo(function ({
  todolistTitle,
  onChangeTitle,
}: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(todolistTitle)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(todolistTitle)
  }
  const activateViewMode = () => {
    setEditMode(false)
    onChangeTitle(title)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const keyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') activateViewMode()
  }

  return editMode ? (
    <TextField
      className={s.input}
      value={title}
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewMode}
      onKeyUp={keyPressed}
    />
  ) : (
    <Typography onDoubleClick={activateEditMode} variant={'h2'} className={s.title}>
      {title}
    </Typography>
  )
})
