import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ContactList.styled';
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

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
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
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <input
        type="text"
        placeholder="Filter contacts by name"
        value={filterValue}
        onChange={handleFilterChange}
      />

      <ul>
        {currentContacts.map(({ id, name, number }) => (
          <li key={id}>
            {name}: {number}{' '}
            <Button onClick={() => handleUpdateContact(id, name, number)}>
              Edit
            </Button>
            <Button onClick={() => handleDeleteContact(id)}>Delete</Button>
          </li>
        ))}
      </ul>
      {editingContact && (
        <div>
          <input
            type="text"
            value={editingContact.name}
            onChange={e => handleUpdateNameChange(e)}
          />
          <input
            type="text"
            value={editingContact.number}
            onChange={e => handleUpdateNumberChange(e)}
          />
          <button onClick={() => handleSaveUpdate()}>Save</button>
        </div>
      )}
      <ReactPaginate
        pageCount={Math.ceil(filteredContacts.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={({ selected }) => handlePageChange(selected + 1)}
      />
    </div>
  );
};
