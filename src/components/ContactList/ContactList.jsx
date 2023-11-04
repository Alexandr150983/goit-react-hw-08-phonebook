import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ContactList.styled';
import {
  selectContacts,
  selectFilter,
  selectContactsIsLoading,
  selectContactsError,
} from 'redux/Contact/selectors';
import { deleteContact, fetchContacts } from 'redux/Contact/operations';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = (contacts || []).filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = id => {
    dispatch(deleteContact(id)).then(() => {
      toast.success('Контакт успішно видалено!', {
        position: 'top-right',
        autoClose: 3000,
      });
    });
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {filteredContacts.map(({ id, name, number }) => (
          <li key={id}>
            {name}: {number}{' '}
            <Button onClick={() => handleDeleteContact(id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
