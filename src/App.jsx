import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routers from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {routers.map((router) => {
            return (
              <Route
                key={router.id}
                path={router.path}
                element={router.element}
              >
                {router.children?.map(({ id, path, element }) => {
                  return <Route key={id} path={path} element={element} />;
                })}
              </Route>
            );
          })}
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
};

export default App;
