"use client";

import { UseFormRegister, FieldValues } from 'react-hook-form';

interface InputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: any;
  required?: boolean;
  placeholder: string;
  type: string;
}

const Input = ({ id, register, errors, required, placeholder, type }: InputProps) => {
  return (
    <div>
      <input
        {...register(id, { required })}
        placeholder={placeholder}
        type={type}
        className="input"
      />
      {errors[id] && <span>This field is required</span>}
    </div>
  );
};

export default Input;
