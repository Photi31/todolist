import { Outlet } from 'react-router-dom'

import { Header } from 'app/header/header.tsx'
import s from 'app/root/root.module.scss'

export const Root = () => {
  return (
    <div>
      <Header />
      <div className={s.container}>
        <Outlet />
      </div>
    </div>
  )
}
