import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LoginForm } from 'components/login-form/login.tsx'
import { Root } from 'components/root/Root.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <LoginForm />,
      },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
