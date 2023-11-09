import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import RestictedRoute from 'components/RestrictedRoute';
import { refreshThunk } from 'redux/auth/operations';
import Loader from 'components/Loader';
import { Suspense } from 'react';
import { selectAuthIsLoading } from 'redux/auth/selectors';
import Navigation from 'components/Navigation/Navigation';
import { lazy } from 'react';

const HomePage = lazy(() => import('pages/Home'));
const RegisterPage = lazy(() => import('pages/Register'));
const LoginPage = lazy(() => import('pages/Login'));
const ContactsPage = lazy(() => import('pages/Contacts'));

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
  {
    path: '*',
    element: <Navigate to="/" />,
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
