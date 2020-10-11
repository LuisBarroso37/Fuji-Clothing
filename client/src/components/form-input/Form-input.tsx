import React from 'react';

import './Form-input.scss';

interface IFormInput {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
  type: string;
  name: string;
  value: string;
  label: string;
  required: boolean;
}

const FormInput: React.FC<IFormInput> = ({
  handleChange,
  label,
  name,
  value,
  type,
}) => (
  <div className='form'>
    <label
      className={`${value.length ? 'shrink' : ''} form-input-label`}
      htmlFor={name}
    >
      {label}
    </label>
    <input
      className='form-input'
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormInput;
