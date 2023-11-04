import { Form as FormikForm, Label, Button } from './ContactForm.styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { selectContacts } from 'redux/Contact/selectors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addContact } from 'redux/Contact/operations';

const schema = object({
  name: string().min(3, 'must be at least 3 characters long').required(),
  number: string()
    .matches(
      /^(?:\+38)?(?:\d{10}|\d{3}[-\s]\d{3}[-\s]\d{4}|\(\d{3}\)[-.\s]\d{3}[-.\s]\d{4})$/,
      'Invalid phone number format. Use Ukrainian format, e.g., +380501234567'
    )
    .required('Phone number is required'),
});

const initialValues = {
  name: '',
  number: '',
};

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    if (
      contacts?.some(
        contact =>
          contact.name === values.name || contact.number === values.number
      )
    ) {
      toast.error('Цей контакт вже існує.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      const newContact = {
        name: values.name,
        number: values.number,
      };
      dispatch(addContact(newContact)).then(() => {
        toast.success('Контакт успішно додано!', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
      resetForm();
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormikForm as={Form}>
        <Label>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" />
        </Label>
        <br />
        <Label>
          Phone
          <Field type="tel" name="number" />
          <ErrorMessage name="number" />
        </Label>
        <br />
        <Button type="submit">Add contact</Button>
      </FormikForm>
    </Formik>
  );
}
