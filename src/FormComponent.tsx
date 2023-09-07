import React from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

function FormComponent() {
  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name:</label>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        <p>{formState.errors?.firstName?.message}</p>
      </div>

      <div>
        <label>Last Name:</label>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        <p>{formState?.errors?.lastName?.message}</p>
      </div>

      <div>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        <p>{formState?.errors?.email?.message}</p>
      </div>

      <button type="submit" disabled={formState.isSubmitting}>
        Submit
      </button>
    </form>
  );
}

export default FormComponent;
