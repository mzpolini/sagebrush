"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Resolver, SubmitHandler, Controller } from "react-hook-form";
import Form from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import { z } from "zod";

import { schema } from "./formSchema";
import { onSubmitAction } from "./formSubmit";

type FormValues = {
  firstName: string;
  lastName: string;
};

export default function ApplicantForm() {
  const form = useForm<z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(data: z.output<typeof schema>) {
    console.log("data:", data);
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);

    console.log(await onSubmitAction(formData));
  }

  console.log("form render data:", form);
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm/6 font-medium text-gray-900"
        >
          First Name
        </label>
        <div className="mt-2 grid grid-cols-1">
          <Controller
            name="firstName"
            control={form.control}
            rules={{
              minLength: {
                value: 2,
                message: "Must be at least 2 letters",
              },
              required: {
                value: true,
                message: "We need your first name in order to proceed",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
              />
            )}
          />

          <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
          />
          {/* <p id={`${name}-error`} className="mt-2 text-sm text-red-600">
            {errors.firstName && errors.firstName.message}
          </p> */}
        </div>
      </div>
      <div>
        <div className="mt-2 grid grid-cols-1">
          <Controller
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
              />
            )}
          />
          {/* <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
          /> */}
        </div>
        {/* <p id={`${name}-error`} className="mt-2 text-sm text-red-600">
          {errors.lastName && errors.lastName.message}
        </p> */}
      </div>
      <input
        type="submit"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      />
    </form>
  );
}
