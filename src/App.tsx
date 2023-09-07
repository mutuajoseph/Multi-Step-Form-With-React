import { FC } from 'react';
import FormComponent from './FormComponent';
import FormComponentThree from './FormComponentThree';
// import FormComponentTwo from './FormComponentTwo';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <h1>Hello {name}!</h1>
      <p>Start editing to see some magic happen :)</p>
      <FormComponentThree />
    </div>
  );
};
