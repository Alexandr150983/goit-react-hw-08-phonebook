import { Box, Heading } from '@chakra-ui/react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { ToastContainer } from 'react-toastify';

export default function Contacts() {
  return (
    <Box maxW="lg" mx="auto" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Phonebook
      </Heading>
      <ContactForm />
      <ToastContainer />
      <Heading as="h2" size="lg" mt={6} mb={4}>
        Contacts
      </Heading>
      <ContactList />
      <ToastContainer />
    </Box>
  );
}
