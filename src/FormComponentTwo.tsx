import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string(),
});

function FormComponent() {
  const { handleSubmit, control, formState, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    if (step < 3) {
      setStep(step + 1);
    }

    console.log(data);
  };

  const onPrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onNext = async () => {
    console.log('I have been clicked');
    // Clear previous validation errors
    clearErrors();

    try {
      await schema.validate(formData, { abortEarly: false });
      // If validation passes, move to the next step
      if (step < 3) {
        setStep(step + 1);
      }
    } catch (err) {
      // If validation fails, display errors
      err.inner.forEach((error) => {
        setError(error.path, { type: 'manual', message: error.message });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <div>
          <label>First Name:</label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          <p style={{ color: 'red' }}>{formState.errors.firstName?.message}</p>
        </div>
      )}

      {step === 2 && (
        <div>
          <label>Last Name:</label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          <p>{formState.errors.lastName?.message}</p>
        </div>
      )}

      {step === 3 && (
        <div>
          <label>Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          <p>{formState.errors.email?.message}</p>
        </div>
      )}

      <div>
        {step > 1 && (
          <button type="button" onClick={onPrevious}>
            Previous
          </button>
        )}

        {step < 3 ? (
          <button type="submit" onClick={onNext}>
            Next
          </button>
        ) : (
          <button type="submit" disabled={formState.isSubmitting}>
            Submit
          </button>
        )}
      </div>
    </form>
  );
}

export default FormComponent;
