import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Root } from 'app/root/Root.tsx'
import { LoginForm } from 'features/auth/login-form/login'
import { Todolists } from 'features/todolists/components/todolists/todolists.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/todolists',
        element: <Todolists />,
      },
    ],
  },
])

export function App() {
  //todo toast
  return (
    <div>
      {/*<ToastContainer*/}
      {/*  className={s.toast}*/}
      {/*  position="top-center"*/}
      {/*  autoClose={3000}*/}
      {/*  hideProgressBar={false}*/}
      {/*  newestOnTop={false}*/}
      {/*  closeOnClick*/}
      {/*  rtl={false}*/}
      {/*  pauseOnFocusLoss*/}
      {/*  draggable*/}
      {/*  pauseOnHover*/}
      {/*  theme="dark"*/}
      {/*/>*/}
      <RouterProvider router={router} />
    </div>
  )
}
