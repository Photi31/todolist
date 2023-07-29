import { Outlet } from 'react-router-dom'

import { Header } from 'components/header/header.tsx'

import s from './root.module.scss'

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
