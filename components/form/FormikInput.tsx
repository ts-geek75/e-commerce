"use client";

import React from "react";
import { ErrorMessage, Field } from "formik";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormikInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-light">{label}</Label>

      <Field name={name}>
        {({ field }: any) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className="h-11"
          />
        )}
      </Field>

      <ErrorMessage
        name={name}
        component="p"
        className="text-xs text-red-500"
      />
    </div>
  );
};

export default FormikInput;
