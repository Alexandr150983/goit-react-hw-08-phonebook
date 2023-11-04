import { LogoutButton } from 'components/Navigation/NavigationStyled';
import { useDispatch, useSelector } from 'react-redux';
import { logOutThunk } from 'redux/Auth/operations';
import { selectAuthUserEmail } from 'redux/Auth/selectors';
import { UserEmail, UserMenuContainer } from './UserMenuStyled';

const UserMenu = () => {
  const userEmail = useSelector(selectAuthUserEmail);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutThunk());
  };

  return (
    <UserMenuContainer>
      <UserEmail>{userEmail}</UserEmail>
      <LogoutButton onClick={handleLogOut}>Logout</LogoutButton>
    </UserMenuContainer>
  );
};

export default UserMenu;
