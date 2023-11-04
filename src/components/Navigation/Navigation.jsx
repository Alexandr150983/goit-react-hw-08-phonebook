import { StyledNavLink } from 'AppStyled';
import { useDispatch, useSelector } from 'react-redux';
import { logOutThunk } from 'redux/Auth/operations';
import { selectAuthAuthenticated } from 'redux/Auth/selectors';
import { LogoutButton } from './NavigationStyled';

const Navigation = () => {
  const authenticated = useSelector(selectAuthAuthenticated);
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logOutThunk());
  };

  return (
    <header>
      <nav>
        <StyledNavLink className="header-link" to="/">
          Home
        </StyledNavLink>
        {authenticated ? (
          <>
            <StyledNavLink className="header-link" to="/contacts">
              Contacts
            </StyledNavLink>{' '}
            <LogoutButton onClick={onLogOut}>Log Out</LogoutButton>
          </>
        ) : (
          <>
            <StyledNavLink className="header-link" to="/login">
              Login
            </StyledNavLink>
            <StyledNavLink className="header-link" to="/register">
              Register
            </StyledNavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
