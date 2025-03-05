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
    id?: number;
    userId?: string;
    profileId?: string;
    licenseType?: string;
    experience?: string;
    criminalHistory?: string | null;
    financialInvestment?: string;
    securityPlan?: string;
    businessPlan?: string;
    status?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
  } | null;
}

export default function ApplicantForm({ initialData }: Props = {}) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      licenseType: initialData?.licenseType || "",
      experience: initialData?.experience || "",
      criminalHistory: initialData?.criminalHistory || "",
      financialInvestment: initialData?.financialInvestment || "",
      securityPlan: initialData?.securityPlan || "",
      businessPlan: initialData?.businessPlan || "",
    },
  });

  async function onSubmit(data: FormData) {
    startTransition(async () => {
      const formData = new FormData();

      // Add the current URL to the form data to extract the profile ID
      formData.append("url", window.location.href);

      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
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
              License Information
            </h2>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              Please provide information about your cannabis license.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="licenseType"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  License Type
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    {...form.register("licenseType")}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-background-secondary py-1.5 pl-3 pr-8 text-base text-foreground outline outline-1 -outline-offset-1 outline-border focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  >
                    <option value="">Select license type</option>
                    <option value="cultivation">Cultivation</option>
                    <option value="processing">Processing</option>
                    <option value="retail">Retail</option>
                    <option value="distribution">Distribution</option>
                    <option value="testing">Testing</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-foreground-muted sm:size-4"
                  />
                  {form.formState.errors.licenseType?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.licenseType.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-border pb-12">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Experience & Background
            </h2>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              Tell us about your experience in the cannabis industry.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="experience"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Industry Experience
                </label>
                <div className="mt-2">
                  <textarea
                    {...form.register("experience")}
                    rows={4}
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    placeholder="Describe your experience in the cannabis industry"
                  />
                  {form.formState.errors.experience?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.experience.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm/6 text-foreground-muted">
                  Include details about your past work in the cannabis industry
                  or related fields.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="criminalHistory"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Criminal History (if applicable)
                </label>
                <div className="mt-2">
                  <textarea
                    {...form.register("criminalHistory")}
                    rows={4}
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    placeholder="Disclose any relevant criminal history (optional)"
                  />
                  {form.formState.errors.criminalHistory?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.criminalHistory.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm/6 text-foreground-muted">
                  This information will be kept confidential and is used for
                  background check purposes.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-border pb-12">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Business Details
            </h2>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              Provide details about your business plans and investment.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="financialInvestment"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Financial Investment
                </label>
                <div className="mt-2">
                  <textarea
                    {...form.register("financialInvestment")}
                    rows={4}
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    placeholder="Describe your financial investment plans"
                  />
                  {form.formState.errors.financialInvestment?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.financialInvestment.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm/6 text-foreground-muted">
                  Include information about funding sources and capital
                  allocation.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="securityPlan"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Security Plan
                </label>
                <div className="mt-2">
                  <textarea
                    {...form.register("securityPlan")}
                    rows={4}
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    placeholder="Describe your security plan for the business"
                  />
                  {form.formState.errors.securityPlan?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.securityPlan.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm/6 text-foreground-muted">
                  Detail your approach to facility security, inventory control,
                  and compliance.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="businessPlan"
                  className="block text-sm/6 font-medium text-foreground-secondary"
                >
                  Business Plan
                </label>
                <div className="mt-2">
                  <textarea
                    {...form.register("businessPlan")}
                    rows={4}
                    className="block w-full rounded-md bg-background-secondary px-3 py-1.5 text-base text-foreground outline outline-1 -outline-offset-1 outline-border placeholder:text-foreground-muted focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    placeholder="Describe your business plan"
                  />
                  {form.formState.errors.businessPlan?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.businessPlan.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm/6 text-foreground-muted">
                  Outline your business strategy, market analysis, and growth
                  projections.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={isPending} className="btn-primary">
            {isPending ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
