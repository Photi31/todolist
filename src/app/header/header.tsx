import { useNavigate } from 'react-router-dom'

import s from 'app/header/header.module.scss'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { authThunks } from 'features/auth/auth.slice.ts'
import { LogoutSvg } from 'images/icons/logout.tsx'
import { Button } from 'ui/button/button.tsx'
import { Typography } from 'ui/typography'

export const Header = () => {
  const userId = useAppSelector(state => state.auth.userId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const singIn = () => {
    navigate('/login')
  }
  const singOut = () => {
    dispatch(authThunks.logout())
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Typography variant={'large'} className={s.title}>
          todolists
        </Typography>
        {!userId ? (
          <Button onClick={singIn}>Sing in</Button>
        ) : (
          <Button onClick={singOut}>
            <LogoutSvg />
            Sing out
          </Button>
        )}
      </div>
    </header>
  )
}
