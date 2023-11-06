import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAuthAuthenticated } from 'redux/Auth/selectors';
import UserMenu from 'components/UserMenu/UserMenu';
import { StyledNavLink } from 'AppStyled';

const Navigation = () => {
  const authenticated = useSelector(selectAuthAuthenticated);

  return (
    <Box as="header" bgColor="teal" color="white" p={4}>
      <Flex justify="space-between">
        <Link as={StyledNavLink} to="/" fontSize="xl">
          Home
        </Link>
        <Flex align="center">
          {authenticated ? (
            <>
              <Link as={StyledNavLink} to="/contacts" mr={4}>
                Contacts
              </Link>
              <UserMenu />
            </>
          ) : (
            <>
              <Link as={StyledNavLink} to="/login" mr={4}>
                Login
              </Link>
              <Link as={StyledNavLink} to="/register">
                Register
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;
