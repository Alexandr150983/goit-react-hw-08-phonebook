import { StyledNavLink } from 'AppStyled';
import { useSelector } from 'react-redux';
import { selectAuthAuthenticated } from 'redux/Auth/selectors';
import UserMenu from 'components/UserMenu/UserMenu';

const Navigation = () => {
  const authenticated = useSelector(selectAuthAuthenticated);

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
            <UserMenu />
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
