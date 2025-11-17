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
    licenseType?: string | null;
    experience?: string | null;
    criminalHistory?: string | null;
    financialInvestment?: string | null;
    securityPlan?: string | null;
    businessPlan?: string | null;
    status?: string;
    submittedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
}

export default function ApplicantForm({ initialData }: Props = {}) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const { addToast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      licenseType: (initialData?.licenseType as FormData["licenseType"]) || undefined,
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

      try {
        await onSubmitAction(formData);
        addToast({
          title: "Success",
          description: "Application submitted successfully",
          type: "success",
          duration: 5000,
        });
      } catch (error) {
        addToast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to submit application",
          type: "error",
          duration: 5000,
        });
      }
    });
  }

  const isDirty = form.formState.isDirty;

  return (
    <FormProvider {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} aria-label="Cannabis license application form">
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
                <Select
                  {...form.register("licenseType")}
                  label="License Type"
                  error={form.formState.errors.licenseType?.message}
                  required
                >
                  <option value="">Select license type</option>
                  <option value="cultivation">Cultivation</option>
                  <option value="processing">Processing</option>
                  <option value="retail">Retail</option>
                  <option value="distribution">Distribution</option>
                  <option value="testing">Testing</option>
                </Select>
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
                <Textarea
                  {...form.register("experience")}
                  label="Industry Experience"
                  error={form.formState.errors.experience?.message}
                  rows={4}
                  maxLength={2000}
                  showCount
                  helperText="Include details about your past work in the cannabis industry or related fields."
                  placeholder="Describe your experience in the cannabis industry"
                  required
                />
              </div>

              <div className="col-span-full">
                <Textarea
                  {...form.register("criminalHistory")}
                  label="Criminal History (if applicable)"
                  error={form.formState.errors.criminalHistory?.message}
                  rows={4}
                  maxLength={2000}
                  showCount
                  helperText="This information will be kept confidential and is used for background check purposes."
                  placeholder="Disclose any relevant criminal history (optional)"
                />
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
                <Textarea
                  {...form.register("financialInvestment")}
                  label="Financial Investment"
                  error={form.formState.errors.financialInvestment?.message}
                  rows={4}
                  maxLength={2000}
                  showCount
                  helperText="Include information about funding sources and capital allocation."
                  placeholder="Describe your financial investment plans"
                  required
                />
              </div>

              <div className="col-span-full">
                <Textarea
                  {...form.register("securityPlan")}
                  label="Security Plan"
                  error={form.formState.errors.securityPlan?.message}
                  rows={4}
                  maxLength={2000}
                  showCount
                  helperText="Detail your approach to facility security, inventory control, and compliance."
                  placeholder="Describe your security plan for the business"
                  required
                />
              </div>

              <div className="col-span-full">
                <Textarea
                  {...form.register("businessPlan")}
                  label="Business Plan"
                  error={form.formState.errors.businessPlan?.message}
                  rows={6}
                  maxLength={5000}
                  showCount
                  helperText="Outline your business strategy, market analysis, and growth projections."
                  placeholder="Describe your business plan"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <FormActions
          submitText="Submit Application"
          cancelText="Cancel"
          isSubmitting={isPending}
          isSticky={true}
          isDirty={isDirty}
        />
      </form>
    </FormProvider>
  );
}
