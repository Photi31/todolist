import { Button } from 'components/button/button.tsx'

import s from './header.module.scss'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <span className={s.title}>todolists</span>
        <Button>Sing in</Button>
      </div>
    </header>
  )
}
