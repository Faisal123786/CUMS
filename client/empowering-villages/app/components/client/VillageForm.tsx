"use client";
import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import Button from "../UI/Button";
import { RiResetLeftFill } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import InputField from "../UI/InputField";
import { useToaster } from "@/app/context/ToasterContext";
import { addVillage } from "@/app/services/villageService";
import { villageSchema } from "@/app/lib/validationSchema/schemas";

interface VillageData {
  name: string;
  location: string;
  nearerCity: string;
  district: string;
  tehsil: string;
  postalCode: number | string;
  image: File | null;
}

function VillageForm() {
  const { showToast } = useToaster();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik<VillageData>({
    initialValues: {
      name: "",
      location: "",
      nearerCity: "",
      district: "",
      tehsil: "",
      postalCode: "",
      image: null,
    },
    validationSchema: villageSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value as any);
        });
        const data = await addVillage(formData);
        showToast(data?.message, "success");
      } catch (error: any) {
        showToast(error?.response?.data?.message, "error");
      } finally {
        setIsLoading(false);
        resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
  });

  const handleSubmitWithToast = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => {
        showToast(msg as string, "error");
      });
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmitWithToast}>
      <div className="border-b border-text font-semibold leading-none">
        <span className="bg-background rounded-full text-white p-2 py-0">1</span>
        Basic Information
      </div>

      <div className="mt-10 flex flex-wrap gap-x-4 gap-y-4">
        {[
          {
            name: "name",
            label: "Village Name*",
            placeholder: "Enter Village Name",
            type: "text",
          },
          {
            name: "location",
            label: "Village Location*",
            placeholder: "Enter Village Location",
            type: "text",
          },
         
          {
            name: "nearerCity",
            label: "Village Nearer City*",
            placeholder: "Enter Nearer City Of Village",
            type: "text",
          },
          {
            name: "district",
            label: "Village District*",
            placeholder: "Enter District Of Village",
            type: "text",
          },
          {
            name: "tehsil",
            label: "Village Tehsil*",
            placeholder: "Enter Tehsil Of Village",
            type: "text",
          },
          {
            name: "postalCode",
            label: "Village Postal Code*",
            placeholder: "Enter Postal Code Of Village",
            type: "number",
          },
        ].map((field) => (
          <div key={field.name} className="w-full lg:w-[32%]">
            <InputField
              name={field?.name}
              type={field?.type}
              placeholder={field.placeholder}
              value={formik.values[field.name as keyof VillageData]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="py-2.5 border border-text px-2"
              label={field.label}
              labelClassName="text-white bg-background"
            />
          </div>
        ))}

        <div className="w-full lg:w-[32%]">
          <InputField
            name="image"
            type="file"
            ref={fileInputRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue("image", e.currentTarget.files?.[0] || null)
            }
            onBlur={formik.handleBlur}
            className="py-2.5 border border-text px-2"
            label="Village Image*"
            labelClassName="text-white bg-gray-400"
            error={
              formik.touched.image && formik.errors.image
                ? String(formik.errors.image)
                : undefined
            }
          />
        </div>
      </div>

      <hr className="my-5" />

      <div className="flex items-center justify-center gap-4">
        <Button
          label="Reset"
          type="button"
          className="rounded-lg w-fit bg-[#FFC26A] px-10 py-2 text-white"
          loadingText="Resetting"
          icon={<RiResetLeftFill />}
          onClick={() => {
            formik.resetForm();
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
          isLoading={false}
        />

        <Button
          label="Submit"
          type="submit"
          className="rounded-lg w-fit bg-background px-10 py-2 text-white"
          loadingText="Submitting"
          icon={<SiTicktick />}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}

export default VillageForm;
