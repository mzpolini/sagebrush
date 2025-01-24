import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors: any;
  register: UseFormRegister<any>;
}

export default function Input({
  name,
  type,
  placeholder,
  errors,
  register,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {placeholder}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          aria-invalid="true"
          aria-describedby={`${name}-error`}
          className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
          {...register}
        />
        <ExclamationCircleIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
        />
      </div>
      <p id={`${name}-error`} className="mt-2 text-sm text-red-600">
        {errors}
      </p>
    </div>
  );
}
