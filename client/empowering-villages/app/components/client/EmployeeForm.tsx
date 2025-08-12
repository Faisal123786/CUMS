"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "../UI/Button";
import { RiResetLeftFill } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import InputField from "../UI/InputField";
import { useToaster } from "@/app/context/ToasterContext";
import { employeeSchema } from "@/app/lib/validationSchema/schemas";
import { addEmployee } from "@/app/services/employeeService";
import { getAllvillageswithoutEmployee } from "@/app/services/villageService";

interface EmployeeData {
  name: string;
  email: string;
  password: string;
  role: string;
  area: string;
}

function EmployeeForm() {
  const { showToast } = useToaster();
  const [isLoading, setIsLoading] = useState(false);
  const [villageData, setVillageData] = useState<
    { _id: string; name: string }[]
  >([]);
  
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const data = await getAllvillageswithoutEmployee();
        setVillageData(data?.data || []);
      } catch (error) {
        console.error("Error fetching villages", error);
        showToast("Failed to load village options", "error");
      }
    };
    fetchVillages();
  }, []);

  const formik = useFormik<EmployeeData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "Employee",
      area: "",
    },
    validationSchema: employeeSchema,
    onSubmit: async (values: any, { resetForm }) => {
      try {
        setIsLoading(true);
        const data = await addEmployee(values);
        showToast(data?.message, "success");
      } catch (error: any) {
        showToast(error?.response?.data?.message, "error");
      } finally {
        setIsLoading(false);
        resetForm();
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
            label: "Employee Name*",
            placeholder: "Enter Employee Name",
            type: "text",
          },
          {
            name: "email",
            label: "Employee Email*",
            placeholder: "Enter Employee Email",
            type: "email",
          },
          {
            name: "password",
            label: "Employee Password*",
            placeholder: "Enter Employee Password",
            type: "password",
          },
          {
            name: "role",
            label: "Employee Role*",
            placeholder: "Enter Employee Role",
            type: "text",
            disable: true,
          },
        ].map((field) => (
          <div key={field.name} className="w-full lg:w-[32%]">
            <InputField
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formik.values[field.name as keyof EmployeeData]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="py-2.5 border border-text px-2"
              label={field.label}
              labelClassName="text-white bg-background"
              disabled={field.disable}
            />
          </div>
        ))}

        <div className="w-full lg:w-[32%]">
          <InputField
            component="select"
            name="area"
            value={formik.values.area}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="py-2.5 border border-text px-2"
            label="Employee Village*"
            labelClassName="text-white bg-background"
            options={[
              { label: "Select Village", value: "" },
              ...villageData.map((village) => ({
                label: village.name,
                value: village._id,
              })),
            ]}
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

export default EmployeeForm;
