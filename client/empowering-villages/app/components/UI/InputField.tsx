import React from "react";

type InputValue = string | number | boolean | File | FileList | null | undefined;

interface InputFieldProps {
  type: React.HTMLInputTypeAttribute;
  name?: string;
  value?: InputValue;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  labelClassName?: string;
  error?: string;
}

// 🟢 use forwardRef to correctly pass the ref to the <input />
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type,
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
    },
    ref
  ) => {
    return (
      <div className="relative w-full my-1">
        {label && (
          <span
            className={`px-3 text-xs absolute top-[-7px] left-5 z-10 rounded-full ${labelClassName}`}
          >
            {label}
          </span>
        )}
        <input
          type={type}
          name={name}
          ref={ref} // ✅ attach forwarded ref here
          {...(type !== "file" && {
            value: value as string | number | readonly string[] | undefined,
          })}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`border px-3 py-2 outline-none rounded-full w-full ${className}`}
          disabled={disabled}
        />
        {error && <p className="text-sm text-red-500 mt-1 ml-2">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField"; // ✅ required for forwardRef components

export default InputField;
