import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface IForm {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .test(
      "is-email-or-phone",
      "Username must be a valid email or phone number",
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "") || /^0\d{9}$/.test(value || "")
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/^\S*$/, "Password must not contain spaces")
    .matches(/[A-Za-z]/, "Password must contain at least one letter"),
});

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<IForm> = () => {};

  return (
    <div className="flex min-h-screen bg-[#f3f7fa]">
      <div className="flex-1 flex items-center justify-center bg-[#eaf1f6]">
        <img
          className=" w-full rounded-xl shadow-lg"
          src="https://nhannn87dn.github.io/ui-form-antd-yup/statics/img/grovia.png"
          alt="Login visual"
        />
      </div>
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 rounded-xl ">
          <div className="flex flex-col items-center mb-6">
            <div className="text-2xl font-bold text-[#d94f2a] mb-2">Grovia</div>
            <h2 className="text-xl font-semibold text-[#d94f2a] mb-2">Login</h2>
          </div>
          <div className="mb-4">
            <div className="text-lg font-semibold mb-1">Login to your account</div>
            <div className="text-sm text-gray-500">
              Thank you for get back to Grovia, lets access our the best recommendation contact for
              you.
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                {...register("username")}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#d94f2a]"
                type="text"
                placeholder="Email or Phone Number"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#d94f2a]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-500" />
                  ) : (
                    <FiEye className="text-gray-500" />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2 accent-[#d94f2a]" /> Remember
                me
              </label>
              <a href="#" className="text-[#d94f2a] hover:underline">
                Reset Password?
              </a>
            </div>
            <button
              className="w-full bg-[#d94f2a] text-white py-2 rounded font-semibold hover:bg-[#b53e1e] transition"
              type="submit"
            >
              SIGN IN
            </button>
          </form>
          <div className="mt-6 text-center text-sm">
            Don't have an account yet?{" "}
            <a href="#" className="text-[#d94f2a] font-medium hover:underline">
              Join Grovia Now!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
