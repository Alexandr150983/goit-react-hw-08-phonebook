import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerThunk } from 'redux/auth/operations';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(registerThunk(data));
    reset();
  };

  return (
    <Box
      maxW="400px"
      m="0 auto"
      p={4}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bgColor="white"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
          />
          <FormErrorMessage>
            {errors.email && 'This field is required'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.name} mt={4}>
          <FormLabel>Name</FormLabel>
          <Input
            {...register('name', { required: true })}
            type="text"
            placeholder="Name"
          />
          <FormErrorMessage>
            {errors.name && 'This field is required'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.password} mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            {...register('password', { required: true, minLength: 7 })}
            type="password"
            placeholder="Password"
          />
          <FormErrorMessage>
            {errors.password &&
              'This field is required and should be at least 7 characters'}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;
