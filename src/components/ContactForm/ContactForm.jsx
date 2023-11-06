import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
} from '@chakra-ui/react';
import { selectContacts } from 'redux/Contact/selectors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addContact } from 'redux/Contact/operations';

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Must be at least 3 characters long').required(),
  number: Yup.string()
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (
        contacts.some(
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
    },
  });

  return (
    <Box maxW="sm" mx="auto" mt={4} p={4} borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="md" mb={4}>
        Add New Contact
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={formik.touched.name && formik.errors.name}
          mb={3}
        >
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formik.touched.number && formik.errors.number}
          mb={3}
        >
          <FormLabel>Phone</FormLabel>
          <Input
            type="text"
            name="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
          />
          <FormErrorMessage>{formik.errors.number}</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="teal"
          type="submit"
          isLoading={formik.isSubmitting}
        >
          Add Contact
        </Button>
      </form>
    </Box>
  );
}
