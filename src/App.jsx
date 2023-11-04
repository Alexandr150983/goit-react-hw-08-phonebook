import React, { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import RestictedRoute from 'components/RestrictedRoute';
import { refreshThunk } from 'redux/Auth/operations';
import Loader from 'components/Loader';
import { Suspense } from 'react';
import { selectAuthIsLoading } from 'redux/Auth/selectors';
import Navigation from 'components/Navigation/Navigation';
import { StyledAppContainer } from 'AppStyled';

const HomePage = lazy(() => import('./Pages/Home'));
const RegisterPage = lazy(() => import('./Pages/Register'));
const LoginPage = lazy(() => import('./Pages/Login'));
const ContactsPage = lazy(() => import('./Pages/Contacts'));

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
    <StyledAppContainer>
      <Navigation />

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
    </StyledAppContainer>
  );
};
