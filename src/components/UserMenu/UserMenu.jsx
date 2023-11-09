import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Button } from '@chakra-ui/react';
import { logOutThunk } from 'redux/auth/operations';
import { selectAuthUserEmail } from 'redux/auth/selectors';

const UserMenu = () => {
  const userEmail = useSelector(selectAuthUserEmail);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutThunk());
  };

  return (
    <Box display="flex" alignItems="center" bg="teal" color="white">
      <Text fontSize="md" mr={4}>
        {userEmail}
      </Text>
      <Button
        color="white" // Змінено колір тексту на білий
        borderColor="black"
        variant="outline"
        size="sm"
        _hover={{ textDecoration: 'underline' }}
        onClick={handleLogOut}
      >
        Logout
      </Button>
    </Box>
  );
};

export default UserMenu;
