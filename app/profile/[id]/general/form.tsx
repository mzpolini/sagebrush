"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useActionState, useTransition } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { schema, type FormData } from "./schema";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { onSubmitAction } from "./submit";

type ActionState = { message: string };

interface Props {
  initialData?: {
    id: string;
    clerkId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    about: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
  };
}

export default function ApplicantForm({ initialData }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<
    ActionState,
    z.output<typeof schema>
  >(onSubmitAction, { message: "" });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: initialData?.firstName ?? "",
      lastName: initialData?.lastName ?? "",
      email: initialData?.email ?? "",
      username: initialData?.username ?? "",
      about: initialData?.about ?? "",
      address: initialData?.address ?? "",
      city: initialData?.city ?? "",
      state: initialData?.state ?? "",
      zip: initialData?.zip ?? "",
      country: initialData?.country ?? "",
    },
    mode: "onBlur",
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      formAction(data);
    });
  });

  console.log("errors", form.formState.errors);
  console.log("form", form.watch());
  return (
    <FormProvider {...form}>
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-border pb-12">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Profile
            </h2>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-background-secondary outline outline-1 -outline-offset-1 outline-border focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                    <span className="flex select-none items-center pl-3 text-foreground-muted sm:text-sm/6">
                      sagebrush.io/
                    </span>
                    <Input
                      {...form.register("username")}
                      error={form.formState.errors.username?.message}
                      className="block min-w-0 flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    {...form.register("about")}
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  />
                </div>
                <p className="mt-3 text-sm/6 text-foreground-muted">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="size-12 text-foreground-muted"
                  />
                  <button type="button" className="btn-secondary">
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-foreground-muted"
                    />
                    <div className="mt-4 flex text-sm/6 text-foreground-muted">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-background font-semibold text-foreground hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-foreground-muted">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-border pb-12">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Personal Information
            </h2>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  First name
                </label>
                <div className="mt-2">
                  <Input
                    {...form.register("firstName")}
                    error={form.formState.errors.firstName?.message}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <Input
                    {...form.register("lastName")}
                    error={form.formState.errors.lastName?.message}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Input
                    {...form.register("email")}
                    error={form.formState.errors.email?.message}
                    type="email"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Country
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    {...form.register("country")}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-background-secondary py-1.5 pl-3 pr-8 text-base text-foreground outline outline-1 -outline-offset-1 outline-border focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-foreground-muted sm:size-4"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <Input
                    {...form.register("address")}
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  City
                </label>
                <div className="mt-2">
                  <Input
                    {...form.register("city")}
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <Input
                    {...form.register("state")}
                    id="state"
                    name="state"
                    type="text"
                    autoComplete="address-level1"
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="zip"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <Input
                    {...form.register("zip")}
                    id="zip"
                    name="zip"
                    type="text"
                    autoComplete="zip"
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-border pb-12">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Notifications
            </h2>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              Well always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-foreground-secondary">
                  By email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          defaultChecked
                          id="comments"
                          name="comments"
                          type="checkbox"
                          aria-describedby="comments-description"
                          className="col-start-1 row-start-1 appearance-none rounded border border-border bg-background-secondary checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-border disabled:bg-transparent"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-foreground group-has-[:disabled]:stroke-foreground/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-foreground-secondary"
                      >
                        Comments
                      </label>
                      <p
                        id="comments-description"
                        className="text-foreground-muted"
                      >
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          aria-describedby="candidates-description"
                          className="col-start-1 row-start-1 appearance-none rounded border border-border bg-background-secondary checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-border disabled:bg-transparent"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-foreground group-has-[:disabled]:stroke-foreground/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-foreground-secondary"
                      >
                        Candidates
                      </label>
                      <p
                        id="candidates-description"
                        className="text-foreground-muted"
                      >
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          aria-describedby="offers-description"
                          className="col-start-1 row-start-1 appearance-none rounded border border-border bg-background-secondary checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-border disabled:bg-transparent"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-foreground group-has-[:disabled]:stroke-foreground/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-foreground-secondary"
                      >
                        Offers
                      </label>
                      <p
                        id="offers-description"
                        className="text-foreground-muted"
                      >
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm/6 font-semibold text-foreground-secondary">
                  Push notifications
                </legend>
                <p className="mt-1 text-sm/6 text-foreground-muted">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      defaultChecked
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-border bg-background-secondary checked:border-primary checked:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-border disabled:bg-transparent disabled:before:bg-transparent forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm/6 font-medium text-foreground-secondary"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-border bg-background-secondary checked:border-primary checked:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-border disabled:bg-transparent disabled:before:bg-transparent forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm/6 font-medium text-foreground-secondary"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-border bg-background-secondary checked:border-primary checked:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-border disabled:bg-transparent disabled:before:bg-transparent forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm/6 font-medium text-foreground-secondary"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
