import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Input,
  Text,
  Flex,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  selectContacts,
  selectContactsIsLoading,
  selectContactsError,
} from 'redux/Contact/selectors';
import {
  deleteContact,
  fetchContacts,
  updateContact,
} from 'redux/Contact/operations';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [filterValue, setFilterValue] = useState('');
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleUpdateContact = (id, name, number) => {
    setEditingContact({ id, name, number });
  };

  const handleUpdateNameChange = e => {
    setEditingContact({
      ...editingContact,
      name: e.target.value,
    });
  };

  const handleUpdateNumberChange = e => {
    setEditingContact({
      ...editingContact,
      number: e.target.value,
    });
  };

  const handleSaveUpdate = () => {
    const updatedContact = {
      id: editingContact.id,
      name: editingContact.name,
      number: editingContact.number,
    };
    dispatch(updateContact(updatedContact));

    toast.success('Контакт успішно оновлено!', {
      position: 'top-right',
      autoClose: 3000,
    });

    setEditingContact(null);
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id)).then(() => {
      toast.success('Контакт успішно видалено!', {
        position: 'top-right',
        autoClose: 3000,
      });
    });
  };

  const handleFilterChange = e => {
    setFilterValue(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;

  const filteredContacts = (contacts || []).filter(contact =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  return (
    <Box maxW="lg" mx="auto" mt={6} p={4} borderWidth="1px" borderRadius="md">
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      <Input
        type="text"
        placeholder="Filter contacts by name"
        value={filterValue}
        onChange={handleFilterChange}
        mb={4}
      />

      {currentContacts.map(({ id, name, number }) => (
        <Box
          key={id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Text>
            {name}: {number}
          </Text>
          <HStack spacing={4}>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => handleUpdateContact(id, name, number)}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => handleDeleteContact(id)}
            >
              Delete
            </Button>
          </HStack>
        </Box>
      ))}

      {editingContact && (
        <Box p={4} borderWidth="1px" borderRadius="md">
          <Input
            type="text"
            value={editingContact.name}
            onChange={handleUpdateNameChange}
            mb={2}
          />
          <Input
            type="text"
            value={editingContact.number}
            onChange={handleUpdateNumberChange}
            mb={2}
          />
          <Button colorScheme="teal" size="sm" onClick={handleSaveUpdate}>
            Save
          </Button>
        </Box>
      )}

      <Flex justifyContent="center" mt={4} align="center">
        <ReactPaginate
          pageCount={Math.ceil(filteredContacts.length / itemsPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          previousLabel={
            <IconButton
              icon={<ChevronLeftIcon />}
              size="sm"
              aria-label="Previous"
              colorScheme="teal"
            />
          }
          nextLabel={
            <IconButton
              icon={<ChevronRightIcon />}
              size="sm"
              aria-label="Next"
              colorScheme="teal"
            />
          }
          containerClassName="pagination"
        />
      </Flex>
    </Box>
  );
};
