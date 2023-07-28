import { Outlet } from 'react-router-dom'

import { Header } from 'components/header/header.tsx'

export const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
