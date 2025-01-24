"use client";

import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";

type FormValues = {
  firstName: string;
  lastName: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

export default function ApplicantForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    console.log("submitting data", data);
  console.log("errors", errors); // watch input value by passing the name of it
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm/6 font-medium text-gray-900"
        >
          First Name
        </label>
        <div className="mt-2 grid grid-cols-1">
          <input
            {...register("firstName", {
              minLength: { value: 2, message: "Must be at least 2 letters" },
              required: {
                value: true,
                message: "We need your name in order to proceed",
              },
            })}
            placeholder="First Name"
            type="text"
            id="firstName"
            name="firstName"
            aria-invalid="true"
            aria-describedby={`firstName-error`}
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
          />
          <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
          />
        </div>
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600">
          {errors.firstName && errors.firstName.message}
        </p>
      </div>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm/6 font-medium text-gray-900"
        >
          {errors.lastName && errors.lastName.message}
        </label>
        <div className="mt-2 grid grid-cols-1">
          <input
            {...register("lastName", { required: true })}
            placeholder="lastName Name"
            type="text"
            id="lastName"
            name="lastName"
            aria-invalid="true"
            aria-describedby={`lastName-error`}
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
          />
          <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
          />
        </div>
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600">
          {errors.firstName && errors.firstName.message}
        </p>
      </div>
      <input type="submit" />
    </Form>
  );
}
