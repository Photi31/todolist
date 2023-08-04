import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Root } from 'app/root/Root.tsx'
import { LoginForm } from 'features/auth/login-form/login'
import { Todolists } from 'features/todolists/todolists'

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
  return <RouterProvider router={router} />
}
