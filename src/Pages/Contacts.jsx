import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { ToastContainer } from 'react-toastify';

export default function Contacts() {
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <ToastContainer />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
      <ToastContainer />
    </div>
  );
}
