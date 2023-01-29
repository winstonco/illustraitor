import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import './index.css';
import Join, { loader as lobbyLoader } from './pages/join/[code]';
import Home from './pages/home';
import Play from './pages/play';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: 'join',
    element: <App />,
    children: [
      {
        path: ':code',
        element: <Join />,
        loader: lobbyLoader,
      },
    ],
  },
  {
    path: 'play',
    element: <App />,
    children: [
      {
        index: true,
        element: <Play />,
      },
    ],
  },
  {
    path: 'test',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
