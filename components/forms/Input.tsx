import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { Controller } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: {
    onChange: (...event: any[]) => void;

    onBlur: () => void;

    value: string;

    name: string;

    ref: React.RefCallback<HTMLInputElement>;
  };
}

export default function Input({ field }: InputProps) {
  console.log("field", field);
  return (
    <input
      {...field}
      className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
    />
  );
}
