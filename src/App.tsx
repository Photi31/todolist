import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Root } from 'Root.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
