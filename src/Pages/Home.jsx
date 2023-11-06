import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box p={4}>
      <Heading as="h1" fontSize="2xl" mb={4}>
        Contacts book welcome page{' '}
        <span role="img" aria-label="Greeting icon">
          📞
        </span>
      </Heading>
      <Text>
        Welcome to our contacts book. This is the homepage of the application.
      </Text>
    </Box>
  );
};

export default HomePage;
