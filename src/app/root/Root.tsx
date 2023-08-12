import { useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import { appActions } from 'app/app.slice.ts'
import { Header } from 'app/header/header.tsx'
import s from 'app/root/root.module.scss'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { LinearProgress } from 'common/loaders/linearProgress/linearProgress.tsx'
import { Loader } from 'common/loaders/loader/loader.tsx'
import { authThunks } from 'features/auth/auth.slice.ts'

export const Root = () => {
  const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)
  const isLoading = useAppSelector(state => state.app.isLoading)
  const userId = useAppSelector(state => state.auth.userId)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.me())
      .unwrap()
      .then(() => {
        if (userId) {
          navigate('/todolists')
        } else {
          navigate('/login')
        }
      })
      .finally(() => {
        dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }))
      })
  }, [dispatch])

  return (
    <div>
      <Header />
      {isLoading && <LinearProgress />}
      <div className={s.container}>{isAppInitialized ? <Outlet /> : <Loader />}</div>
    </div>
  )
}
