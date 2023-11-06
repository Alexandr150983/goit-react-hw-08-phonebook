import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import RestictedRoute from 'components/RestrictedRoute';
import { refreshThunk } from 'redux/Auth/operations';
import Loader from 'components/Loader';
import { Suspense } from 'react';
import { selectAuthIsLoading } from 'redux/Auth/selectors';
import Navigation from 'components/Navigation/Navigation';
import HomePage from './Pages/Home';
import RegisterPage from './Pages/Register';
import LoginPage from './Pages/Login';
import ContactsPage from './Pages/Contacts';

const appRoutes = [
  { path: '/', element: <HomePage /> },
  {
    path: '/register',
    element: (
      <RestictedRoute>
        <RegisterPage />
      </RestictedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <RestictedRoute>
        <LoginPage />
      </RestictedRoute>
    ),
  },
  {
    path: '/contacts',
    element: (
      <PrivateRoute>
        <ContactsPage />
      </PrivateRoute>
    ),
  },
];

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsLoading);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <ChakraProvider>
      {' '}
      <Box bg="gray.100" minHeight="100vh">
        {' '}
        <Navigation />
        <Box p={4}>
          {isRefreshing ? (
            <Loader />
          ) : (
            <Suspense fallback={<Loader />}>
              <Routes>
                {appRoutes.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Routes>
            </Suspense>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
};
