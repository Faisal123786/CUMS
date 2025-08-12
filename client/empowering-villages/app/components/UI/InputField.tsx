import React from "react";

type InputValue = string | number | boolean | File | FileList | null | undefined;

interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  value?: InputValue;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  labelClassName?: string;
  error?: string;
  component?: "input" | "select";
  options?: { label: string; value: string }[];
}

const InputField = React.forwardRef<
  HTMLInputElement | HTMLSelectElement,
  InputFieldProps
>(
  (
    {
      component = "input",
      type = "text",
      name,
      value,
      onChange,
      onBlur,
      placeholder,
      className = "",
      disabled = false,
      label,
      labelClassName = "",
      error,
      options = [],
    },
    ref
  ) => {
    return (
      <div className="relative w-full my-1">
        {label && (
          <span
            className={`px-3 text-xs absolute top-[-7px] left-3 z-10 rounded-sm ${labelClassName}`}
          >
            {label}
          </span>
        )}

        {component === "select" ? (
          <select
            name={name}
            ref={ref as React.Ref<HTMLSelectElement>}
            value={value as string}
            onChange={onChange}
            onBlur={onBlur}
            className={`border px-3 py-2 rounded-lg w-full outline-none ${className}`}
            disabled={disabled}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            ref={ref as React.Ref<HTMLInputElement>}
            {...(type !== "file" && {
              value: value as string | number | readonly string[] | undefined,
            })}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`border px-3 py-2 rounded-lg w-full outline-none ${className}`}
            disabled={disabled}
          />
        )}

        {error && <p className="text-sm text-red-500 mt-1 ml-2">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
