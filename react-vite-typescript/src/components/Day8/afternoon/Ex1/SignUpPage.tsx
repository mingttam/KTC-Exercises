import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";

interface IForm {
  name: string;
  password: string;
  checkbox: boolean;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  checkbox: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
});

const SignUpPage = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      checkbox: false,
    },
  });

  const isChecked = watch("checkbox");

  const onSubmit: SubmitHandler<IForm> = (data) => {
    navigate("/signin", { state: { email, name: data.name } });
    console.log("Name submitted:", data.name);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('https://cdnb.artstation.com/p/assets/images/images/063/775/011/large/prime-archives-miles-by-rafli-fazli.jpg?1686317178')] bg-cover bg-center bg-no-repeat">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 backdrop-blur-3xl p-5 rounded-2xl max-w-[25vw] w-full box-content"
      >
        <span className="text-white">
          Looks like you don't have an account. Let's create a new account for{" "}
          <span className="font-semibold">{email}</span>.
        </span>

        <input
          {...register("name")}
          placeholder="Name"
          type="text"
          id="name"
          className="bg-amber-50 border-2 border-black p-2 rounded-2xl"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}

        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          id="password"
          className="bg-amber-50 border-2 border-black p-2 rounded-2xl"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}

        <div className="flex items-center gap-2">
          <input
            {...register("checkbox")}
            type="checkbox"
            id="checkbox"
            className="border-2 border-black p-2 rounded-2xl"
          />
          <label htmlFor="checkbox" className="wrap max-w-80 text-white ">
            By selecting Agree and continue below, I agree to Terms of Service and Privacy Policy.
          </label>
        </div>
        {errors.checkbox && <span className="text-red-500">{errors.checkbox.message}</span>}

        <button
          type="submit"
          className={`p-2 rounded-2xl text-white ${
            isChecked ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!isChecked}
        >
          Agree and continue
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
