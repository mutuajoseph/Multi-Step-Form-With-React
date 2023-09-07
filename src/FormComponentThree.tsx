import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const Mine = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [step, setStep] = useState(1);
  const onSubmitHandler = (data) => {
    console.log({ data });

    reset();
  };
  return (
    <form>
      <h2>Lets sign you in.</h2>
      <br />

      {step === 1 && (
        <>
          <input {...register('email')} placeholder="email" type="email" />
          <p>{errors.email?.message}</p>
          <br />
        </>
      )}

      {step === 2 && (
        <>
          <input
            {...register('password')}
            placeholder="password"
            type="password"
          />
          <p>{errors.password?.message}</p>
          <br />
        </>
      )}

      {step > 1 ? (
        <button onClick={() => setStep(step - 1)}>Prev</button>
      ) : step < 2 ? (
        <button onClick={() => setStep(step + 1)}>Next</button>
      ) : (
        <button onClick={handleSubmit(onSubmitHandler)}>Submit</button>
      )}
    </form>
  );
};

export default Mine;
