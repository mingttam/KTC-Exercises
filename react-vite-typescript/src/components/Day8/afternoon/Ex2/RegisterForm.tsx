import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  receiveEmails: boolean;
  agree: boolean;
};

const schema = yup
  .object({
    firstName: yup.string().min(2).required("First Name is required"),
    lastName: yup.string().min(2).required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .required("Phone Number is required")
      .matches(/^\d{10,15}$/, "Phone Number must be 10-15 digits"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/, {
        message:
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, and no spaces",
      })
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    receiveEmails: yup.boolean().default(false),
    agree: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  })
  .required();

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      receiveEmails: false,
    },
    mode: "onChange",
  });

  const agreeChecked = watch("agree");

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log(data);
    alert("Registration successful!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 p-8 flex flex-col justify-center items-center relative">
          <div className="flex items-center mb-8">
            <svg width="32" height="32" fill="none" className="mr-2">
              <rect width="32" height="32" rx="8" fill="#fff" fillOpacity="0.2" />
              <rect x="8" y="8" width="16" height="16" rx="4" fill="#fff" />
              <rect x="12" y="12" width="8" height="8" rx="2" fill="#3B82F6" />
            </svg>
            <span className="text-white text-lg font-bold tracking-wide">Lottery Display</span>
          </div>
          <h2 className="text-white text-2xl font-semibold mb-4 text-center">
            A few clicks away
            <br />
            from creating your Lottery Display
          </h2>
          <div className="flex justify-center items-center">
            <img
              src="https://nhannn87dn.github.io/ui-form-antd-yup/statics/img/lottery-display.svg"
              alt="Lottery Display"
              className="w-full h-auto"
            />
          </div>
        </div>
        {/* Right Side */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Register</h2>
          <p className="text-gray-600 mb-6">Manage all your lottery efficiently</p>
          <p className="text-gray-500 text-sm mb-6">
            Let&apos;s get you all set up so you can verify your personal account and begin setting
            up your profile.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">First Name</label>
                <input
                  {...register("firstName")}
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="John"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Last Name</label>
                <input
                  {...register("lastName")}
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Phone Number</label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="0987654321"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone.message}</span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Password</label>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Secret123"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Confirm Password</label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Secret123"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                )}
              </div>
            </div>
            <div className="flex items-center mt-2">
              <input
                {...register("receiveEmails")}
                type="checkbox"
                id="receive-emails"
                className="mr-2"
              />
              <label htmlFor="receive-emails" className="text-gray-700 text-sm">
                Yes, I want to receive Lottery Display emails
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input {...register("agree")} type="checkbox" id="agree" className="mr-2" />
              <label htmlFor="agree" className="text-gray-700 text-sm">
                I agree to all the{" "}
                <span className="text-blue-600 underline cursor-pointer">Term</span>,{" "}
                <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span> and{" "}
                <span className="text-blue-600 underline cursor-pointer">Fees</span>
              </label>
              <div>
                {errors.agree && (
                  <span className="text-red-500 text-sm">{errors.agree.message}</span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 mt-4 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isValid || !agreeChecked}
            >
              Create Account
            </button>
          </form>
          <div className="mt-6 text-center text-gray-700 text-sm">
            Already have an account?{" "}
            <span className="text-blue-600 underline cursor-pointer">Log in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
