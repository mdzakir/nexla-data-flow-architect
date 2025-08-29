import React from "react";
import { clsx } from "clsx";
import type {LucideIcon} from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
          "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500":
            variant === "primary",
          "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100":
            variant === "secondary",
          "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800":
            variant === "ghost",
          "opacity-50 cursor-not-allowed": disabled || loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : Icon ? (
        <Icon className="w-4 h-4 mr-2" />
      ) : null}
      {children}
    </button>
  );
};
