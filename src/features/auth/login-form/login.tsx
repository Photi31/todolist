import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { authThunks } from 'features/auth/auth.slice.ts'
import s from 'features/auth/login-form/login.module.scss'
import { Button } from 'ui/button'
import { ControlledCheckbox } from 'ui/controlled/controlledCheckBox.tsx'
import { ControlledTextField } from 'ui/controlled/controlledTextField.tsx'
import { Typography } from 'ui/typography'

const schema = z.object({
  password: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean(),
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .nonempty('Enter email')
    .min(3, 'Login must be at least 3 characters'),
})

export type LoginFormType = z.infer<typeof schema>

export const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.auth.userId)
  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (data: LoginFormType) => {
    dispatch(authThunks.login(data))
  }

  if (userId) navigate('/todolists')

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant={'h1'} className={s.title}>
        Sing in
      </Typography>
      <ControlledTextField
        placeholder={'Enter you email'}
        label={'Email'}
        name={'email'}
        control={control}
        type="text"
      />
      <ControlledTextField
        className={s.password}
        placeholder={'Enter you password'}
        label={'Password'}
        name={'password'}
        control={control}
        type="password"
      />{' '}
      <ControlledCheckbox label={'Remember me'} name={'rememberMe'} control={control} />
      <Button fullWidth={true} className={s.button} type={'submit'}>
        Sing in
      </Button>
    </form>
  )
}
