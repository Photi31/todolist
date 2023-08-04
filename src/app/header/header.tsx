import { useNavigate } from 'react-router-dom'

import s from 'app/header/header.module.scss'
import { Button } from 'ui/button/button.tsx'
import { Typography } from 'ui/typography'

export const Header = () => {
  const redirect = useNavigate()
  const singIn = () => {
    redirect('/login')
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Typography variant={'large'} className={s.title}>
          todolists
        </Typography>
        <Button onClick={singIn}>Sing in</Button>
      </div>
    </header>
  )
}
