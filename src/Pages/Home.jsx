import React from 'react';
import { Box, Text, Heading, Link, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  const tealColor = useColorModeValue('teal.400', 'teal.200');

  return (
    <Box p={4} textAlign="center">
      <Heading as="h1" fontSize="4xl" mb={4}>
        Contacts Book Welcome Page{' '}
        <span role="img" aria-label="Greeting icon">
          📞
        </span>
      </Heading>
      <Text fontSize="2xl">
        Welcome to our Contacts Book. This is the homepage of the application.
        Get{' '}
        <Link
          as={RouterLink}
          to="/login"
          color={tealColor}
          fontWeight="bold"
          fontSize="2xl"
        >
          logging
        </Link>{' '}
        by logging in or{' '}
        <Link
          as={RouterLink}
          to="/register"
          color={tealColor}
          fontWeight="bold"
          fontSize="2xl"
        >
          register
        </Link>{' '}
        a new account.
      </Text>
    </Box>
  );
};

export default HomePage;
