// src/pages/Login.tsx

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useAuthStore } from "../useAuthStore";

// Strong typed interface for form data
interface IFormInput {
  username: string;
  password: string;
}

// Yup validation schema with strong typing
const validationSchema: yup.ObjectSchema<IFormInput> = yup.object({
  username: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
});

export default function Login() {
  const { login, error } = useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: "onChange", // Validate on change for better UX
    defaultValues: {
      username: "",
      password: "123456789", // Example default value
    },
  });

  const onSubmit = async (data: IFormInput): Promise<void> => {
    login({
      username: data.username,
      password: data.password,
    }).then(() => {
      // Redirect to home page after successful login
      window.location.href = "/home";
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Login</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className={`w-full mt-2 p-3 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 transition-colors text-white placeholder-gray-400 ${
              errors.username
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                : !errors.username && dirtyFields.username
                ? "border-green-500 focus:border-green-500 focus:ring-green-500/50"
                : "border-gray-600 focus:border-blue-500 focus:ring-blue-500/50"
            }`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`w-full mt-2 p-3 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 transition-colors text-white placeholder-gray-400 ${
              errors.password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                : !errors.password && dirtyFields.password
                ? "border-green-500 focus:border-green-500 focus:ring-green-500/50"
                : "border-gray-600 focus:border-blue-500 focus:ring-blue-500/50"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`w-full py-3 rounded-md font-medium transition-colors ${
            isSubmitting || !isValid
              ? "bg-gray-600 cursor-not-allowed text-gray-400"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          }`}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Form validation status indicator */}
        <div className="mt-4 text-center">
          <p className={`text-xs ${isValid ? "text-green-400" : "text-red-400"}`}>
            {isValid ? "Form is valid ✓" : "Please fill in all required fields correctly"}
          </p>
          {error && (
            <p className="text-red-400 text-xs mt-1">
              <span>Login failed</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
