"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useRef, useTransition } from "react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/forms/Input";
import { schema, type FormData } from "./schema";
import { onSubmitAction } from "./submit";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface Props {
  initialData?: {
    id?: string;
    userId?: string;
    investmentRange?: string | null;
    investmentStyle?: string | null;
    preferredLocations?: string[] | null;
    accreditedStatus?: boolean | null;
    investmentGoals?: string | null;
    investmentHistory?: string | null;
    riskTolerance?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
}

export default function InvestorForm({ initialData }: Props = {}) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      investmentRange: initialData?.investmentRange || "",
      investmentStyle: initialData?.investmentStyle || "",
      preferredLocations: initialData?.preferredLocations || [],
      accreditedStatus: initialData?.accreditedStatus || false,
      investmentGoals: initialData?.investmentGoals || "",
      investmentHistory: initialData?.investmentHistory || "",
      riskTolerance: initialData?.riskTolerance || "",
    },
  });

  async function onSubmit(data: FormData) {
    startTransition(async () => {
      const formData = new FormData();

      // Add the current URL to the form data to extract the profile ID
      formData.append("url", window.location.href);

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
          } else if (typeof value === "boolean") {
            formData.append(key, value.toString());
          } else {
            formData.append(key, value);
          }
        }
      });

      await onSubmitAction(formData);
    });
  }

  return (
    <FormProvider {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-border pb-12">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Investment Preferences
            </h2>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              Tell us about your investment preferences and goals.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="investmentRange"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Investment Range
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    {...form.register("investmentRange")}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-background-secondary py-1.5 pl-3 pr-8 text-base text-foreground outline outline-1 -outline-offset-1 outline-border focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  >
                    <option value="">Select investment range</option>
                    <option value="under_50k">Under $50,000</option>
                    <option value="50k_100k">$50,000 - $100,000</option>
                    <option value="100k_250k">$100,000 - $250,000</option>
                    <option value="250k_500k">$250,000 - $500,000</option>
                    <option value="500k_1m">$500,000 - $1 million</option>
                    <option value="over_1m">Over $1 million</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-foreground-muted sm:size-4"
                  />
                  {form.formState.errors.investmentRange?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.investmentRange.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="investmentStyle"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Investment Style
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    {...form.register("investmentStyle")}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-background-secondary py-1.5 pl-3 pr-8 text-base text-foreground outline outline-1 -outline-offset-1 outline-border focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  >
                    <option value="">Select investment style</option>
                    <option value="passive">Passive</option>
                    <option value="active">Active</option>
                    <option value="strategic">Strategic</option>
                    <option value="angel">Angel Investor</option>
                    <option value="venture">Venture Capital</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-foreground-muted sm:size-4"
                  />
                  {form.formState.errors.investmentStyle?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.investmentStyle.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="riskTolerance"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Risk Tolerance
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    {...form.register("riskTolerance")}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-background-secondary py-1.5 pl-3 pr-8 text-base text-foreground outline outline-1 -outline-offset-1 outline-border focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  >
                    <option value="">Select risk tolerance</option>
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="aggressive">Aggressive</option>
                    <option value="speculative">Speculative</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-foreground-muted sm:size-4"
                  />
                  {form.formState.errors.riskTolerance?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.riskTolerance.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="flex items-center gap-x-3 mt-6">
                  <input
                    id="accreditedStatus"
                    {...form.register("accreditedStatus")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="accreditedStatus"
                    className="block text-sm/6 font-medium text-foreground-secondary"
                  >
                    I am an accredited investor
                  </label>
                </div>
                {form.formState.errors.accreditedStatus?.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.accreditedStatus.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-b border-border pb-12">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Investment Goals & History
            </h2>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              Tell us about your investment goals and past experience.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="investmentGoals"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Investment Goals
                </label>
                <div className="mt-2">
                  <textarea
                    {...form.register("investmentGoals")}
                    rows={4}
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    placeholder="Describe your investment goals in the cannabis industry"
                  />
                  {form.formState.errors.investmentGoals?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.investmentGoals.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm/6 text-foreground-muted">
                  Include details about your short and long-term investment
                  objectives.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="investmentHistory"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Investment History
                </label>
                <div className="mt-2">
                  <textarea
                    {...form.register("investmentHistory")}
                    rows={4}
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    placeholder="Describe your past investment experience"
                  />
                  {form.formState.errors.investmentHistory?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.investmentHistory.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm/6 text-foreground-muted">
                  Share information about your previous investments, especially
                  in cannabis or related industries.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-border pb-12">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Preferred Locations
            </h2>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              Select the regions where you're interested in investing.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-foreground-secondary">
                  Regions
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="west_coast"
                          type="checkbox"
                          className="col-start-1 row-start-1 appearance-none rounded border border-border bg-background-secondary checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-border disabled:bg-transparent"
                          onChange={(e) => {
                            const currentLocations =
                              form.getValues().preferredLocations || [];
                            if (e.target.checked) {
                              form.setValue("preferredLocations", [
                                ...currentLocations,
                                "west_coast",
                              ]);
                            } else {
                              form.setValue(
                                "preferredLocations",
                                currentLocations.filter(
                                  (loc) => loc !== "west_coast"
                                )
                              );
                            }
                          }}
                          checked={form
                            .watch("preferredLocations")
                            ?.includes("west_coast")}
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
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="west_coast"
                        className="font-medium text-foreground-secondary"
                      >
                        West Coast
                      </label>
                      <p className="text-foreground-muted">
                        California, Oregon, Washington
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="east_coast"
                          type="checkbox"
                          className="col-start-1 row-start-1 appearance-none rounded border border-border bg-background-secondary checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-border disabled:bg-transparent"
                          onChange={(e) => {
                            const currentLocations =
                              form.getValues().preferredLocations || [];
                            if (e.target.checked) {
                              form.setValue("preferredLocations", [
                                ...currentLocations,
                                "east_coast",
                              ]);
                            } else {
                              form.setValue(
                                "preferredLocations",
                                currentLocations.filter(
                                  (loc) => loc !== "east_coast"
                                )
                              );
                            }
                          }}
                          checked={form
                            .watch("preferredLocations")
                            ?.includes("east_coast")}
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
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="east_coast"
                        className="font-medium text-foreground-secondary"
                      >
                        East Coast
                      </label>
                      <p className="text-foreground-muted">
                        New York, Massachusetts, Florida
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="midwest"
                          type="checkbox"
                          className="col-start-1 row-start-1 appearance-none rounded border border-border bg-background-secondary checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-border disabled:bg-transparent"
                          onChange={(e) => {
                            const currentLocations =
                              form.getValues().preferredLocations || [];
                            if (e.target.checked) {
                              form.setValue("preferredLocations", [
                                ...currentLocations,
                                "midwest",
                              ]);
                            } else {
                              form.setValue(
                                "preferredLocations",
                                currentLocations.filter(
                                  (loc) => loc !== "midwest"
                                )
                              );
                            }
                          }}
                          checked={form
                            .watch("preferredLocations")
                            ?.includes("midwest")}
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
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="midwest"
                        className="font-medium text-foreground-secondary"
                      >
                        Midwest
                      </label>
                      <p className="text-foreground-muted">
                        Illinois, Michigan, Ohio
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              {form.formState.errors.preferredLocations?.message && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.preferredLocations.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={isPending} className="btn-primary">
            {isPending ? "Submitting..." : "Submit Profile"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
