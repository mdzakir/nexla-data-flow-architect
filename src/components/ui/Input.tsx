import React from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600",
          "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
          "focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          "placeholder-gray-500 dark:placeholder-gray-400",
          "transition-all duration-200",
          {
            "border-red-500 focus:ring-red-500": error,
          },
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
