import AdminTemplate from '../template/AdminTemplate';
import Home from '../pages/Home/Home';
import StoreList from '../pages/StoreList/StoreList';
import AddStore from '../pages/AddStore/AddStore';
import DetailStore from '../pages/DetailStore/DetailStore';
import Page404 from '../pages/Page404/Page404';

const routers = [
  {
    id: 'home',
    path: '/',
    element: <Home />,
  },
  {
    id: 'admin',
    path: 'admin',
    // TODO: Handle URL: localhost//admin -> page not pound
    element: <AdminTemplate />,
    children: [
      {
        id: 1,
        path: 'store',
        element: <StoreList />,
      },
      {
        id: 2,
        path: 'store/add-store',
        element: <AddStore />,
      },
      {
        id: 3,
        path: 'store/:slugStore',
        element: <DetailStore />,
      },
      {
        id: 4,
        path: '',
        element: <Page404 />,
      },
    ],
  },
  {
    id: 'page404',
    path: '*',
    element: <Page404 />,
  },
];

export default routers;
