import { useController, useForm } from 'react-hook-form'

import { Button } from 'ui/button'
import { Checkbox } from 'ui/checkBox'
import { TextField } from 'ui/textField'
import { Typography } from 'ui/typography'

import s from './login.module.scss'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { control, register, handleSubmit } = useForm<FormValues>()

  const {
    field: { value, onChange },
  } = useController({
    name: 'rememberMe',
    control,
    defaultValue: false,
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant={'h1'} className={s.title}>
        Sing in
      </Typography>
      <TextField label="Email" {...register('email')} />
      <TextField label="Password" type="password" {...register('password')} />
      <Checkbox
        {...register('rememberMe')}
        label="Remember me"
        checked={value}
        onChange={onChange}
      />
      <Button fullWidth={true} className={s.button} type={'submit'}>
        Sing in
      </Button>
    </form>
  )
}
