"use client";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "tungnt@softech.vn",
      password: "123456789",
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/Day13/afternoon/pages/DashBoard";

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
      callbackUrl,
    });

    if (res?.ok) {
      router.push("/Day13/afternoon/pages/DashBoard");
    } else {
      alert(`Login failed: ${res?.error || "Unknown error"}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <form noValidate className="space-y-4 text-black" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-1">Email:</label>
          <input type="email" {...register("email")} className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Password:</label>
          <input type="password" {...register("password")} className="w-full p-2 border rounded" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
