"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useRef, useTransition } from "react";
import { schema, type FormData } from "./schema";
import { onSubmitAction } from "./submit";
import { Textarea } from "@/components/forms/Textarea";
import { Select } from "@/components/forms/Select";
import { FormActions } from "@/components/forms/FormActions";
import { useToast } from "@/components/ui/toast";

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
  const formRef = useRef<HTMLFormElement>(null);
  const { addToast } = useToast();

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

      try {
        await onSubmitAction(formData);
        addToast({
          title: "Success",
          description: "Investor profile submitted successfully",
          type: "success",
          duration: 5000,
        });
      } catch (error) {
        addToast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to submit investor profile",
          type: "error",
          duration: 5000,
        });
      }
    });
  }

  const isDirty = form.formState.isDirty;

  return (
    <FormProvider {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} aria-label="Investor profile form">
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
                <Select
                  {...form.register("investmentRange")}
                  label="Investment Range"
                  error={form.formState.errors.investmentRange?.message}
                  required
                >
                  <option value="">Select investment range</option>
                  <option value="under_50k">Under $50,000</option>
                  <option value="50k_100k">$50,000 - $100,000</option>
                  <option value="100k_250k">$100,000 - $250,000</option>
                  <option value="250k_500k">$250,000 - $500,000</option>
                  <option value="500k_1m">$500,000 - $1 million</option>
                  <option value="over_1m">Over $1 million</option>
                </Select>
              </div>

              <div className="sm:col-span-3">
                <Select
                  {...form.register("investmentStyle")}
                  label="Investment Style"
                  error={form.formState.errors.investmentStyle?.message}
                  required
                >
                  <option value="">Select investment style</option>
                  <option value="passive">Passive</option>
                  <option value="active">Active</option>
                  <option value="strategic">Strategic</option>
                  <option value="angel">Angel Investor</option>
                  <option value="venture">Venture Capital</option>
                </Select>
              </div>

              <div className="sm:col-span-3">
                <Select
                  {...form.register("riskTolerance")}
                  label="Risk Tolerance"
                  error={form.formState.errors.riskTolerance?.message}
                  required
                >
                  <option value="">Select risk tolerance</option>
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                  <option value="speculative">Speculative</option>
                </Select>
              </div>

              <div className="sm:col-span-3">
                <div className="flex items-center gap-x-3 mt-6">
                  <input
                    id="accreditedStatus"
                    {...form.register("accreditedStatus")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    aria-describedby="accredited-description"
                  />
                  <label
                    htmlFor="accreditedStatus"
                    className="block text-sm/6 font-medium text-foreground-secondary"
                  >
                    I am an accredited investor
                  </label>
                </div>
                {form.formState.errors.accreditedStatus?.message && (
                  <p className="mt-1 text-sm text-error" role="alert">
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
                <Textarea
                  {...form.register("investmentGoals")}
                  label="Investment Goals"
                  error={form.formState.errors.investmentGoals?.message}
                  rows={4}
                  maxLength={2000}
                  showCount
                  helperText="Include details about your short and long-term investment objectives."
                  placeholder="Describe your investment goals in the cannabis industry"
                  required
                />
              </div>

              <div className="col-span-full">
                <Textarea
                  {...form.register("investmentHistory")}
                  label="Investment History"
                  error={form.formState.errors.investmentHistory?.message}
                  rows={4}
                  maxLength={2000}
                  showCount
                  helperText="Share information about your previous investments, especially in cannabis or related industries."
                  placeholder="Describe your past investment experience"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-b border-border pb-12">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Preferred Locations
            </h2>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              Select the regions where you&apos;re interested in investing.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-foreground-secondary">
                  Regions <span className="text-error" aria-label="required">*</span>
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
                <p className="mt-1 text-sm text-error" role="alert">
                  {form.formState.errors.preferredLocations.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <FormActions
          submitText="Submit Profile"
          cancelText="Cancel"
          isSubmitting={isPending}
          isSticky={true}
          isDirty={isDirty}
        />
      </form>
    </FormProvider>
  );
}
