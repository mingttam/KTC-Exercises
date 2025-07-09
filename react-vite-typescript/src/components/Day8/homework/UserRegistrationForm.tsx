import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";

type Gender = "male" | "female" | "other";

interface IForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: Gender;
  dateOfBirth: string;
  country: string;
  hobbies: string[];
  profilePicture: FileList | null;
  bio?: string;
}

const schema: yup.ObjectSchema<IForm> = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),
  email: yup.string().email("Invalid email address").required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters with letters and numbers")
    .required("Password is required")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/, "Password must contain letters and numbers"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}$/, "Phone number must start with 0 and be 10 digits long")
    .required("Phone Number is required"),
  gender: yup
    .mixed<Gender>()
    .oneOf(["male", "female", "other"], "Please select a gender")
    .required("Please select a gender"),

  dateOfBirth: yup
    .string()
    .required("Choose your date of birth")
    .test("age", "You must be at least 18 years old", (value) => {
      if (!value) return false;
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),
  country: yup.string().required("Please select a country"),
  //select at least one hobby
  hobbies: yup
    .array()
    .of(yup.string().required())
    .min(1, "select at least one hobby")
    .required("select at least one hobby"),
  profilePicture: yup.mixed<FileList>().nullable().default(null),
  bio: yup.string().max(500, "Bio must be at most 500 characters"),
});

const UserRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
    alert("Submitted successfully!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            {...register("fullName")}
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            {...register("phoneNumber")}
            type="tel"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <div {...register("gender")} className="flex gap-6">
            <label className="flex items-center gap-1">
              <input
                {...register("gender")}
                type="radio"
                name="gender"
                value="male"
                className="accent-blue-500"
              />{" "}
              Male
            </label>
            <label className="flex items-center gap-1">
              <input
                {...register("gender")}
                type="radio"
                name="gender"
                value="female"
                className="accent-blue-500"
              />{" "}
              Female
            </label>
            <label className="flex items-center gap-1">
              <input
                {...register("gender")}
                type="radio"
                name="gender"
                value="other"
                className="accent-blue-500"
              />{" "}
              Other
            </label>
          </div>
          {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input
            {...register("dateOfBirth")}
            type="date"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Country</label>
          <select
            {...register("country")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="other">Other</option>
          </select>
          {errors.country && <p className="text-red-500">{errors.country.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Hobbies</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-1">
              <input
                {...register("hobbies")}
                type="checkbox"
                className="accent-blue-500"
                value="reading"
              />{" "}
              Reading
            </label>
            <label className="flex items-center gap-1">
              <input
                {...register("hobbies")}
                type="checkbox"
                className="accent-blue-500"
                value="travelling"
              />{" "}
              Travelling
            </label>
            <label className="flex items-center gap-1">
              <input
                {...register("hobbies")}
                type="checkbox"
                className="accent-blue-500"
                value="gaming"
              />{" "}
              Gaming
            </label>
            {errors.hobbies && <p className="text-red-500">{errors.hobbies.message}</p>}
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Profile Picture</label>
          <input {...register("profilePicture")} type="file" className="w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            {...register("bio")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
