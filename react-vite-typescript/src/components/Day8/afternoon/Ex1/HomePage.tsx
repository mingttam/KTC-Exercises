import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IForm {
  email: string;
}

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
});

const HomePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const onSubmit: SubmitHandler<IForm> = () => {
    navigate("/signup", { state: { email } });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('https://cdnb.artstation.com/p/assets/images/images/063/775/011/large/prime-archives-miles-by-rafli-fazli.jpg?1686317178')] bg-cover bg-center bg-no-repeat">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 backdrop-blur-3xl p-5 rounded-2xl box-content items-center justify-center max-w-[25vw] w-full"
      >
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleEmailChange}
          className="p-2 rounded-2xl border-2 border-black w-full bg-amber-50"
        />
        <span className="text-red-500 min-h-[24px] block">
          {errors.email ? errors.email.message : ""}
        </span>

        <button className="bg-green-500 text-white p-2 rounded-2xl w-full" type="submit">
          Continue
        </button>

        <p className=" flex mx-40 text-center">Or</p>
        <button className=" flex items-center gap-2 bg-[#e6f9f3] text-black p-2 rounded-2xl w-full font-semibold">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <g>
              <path
                d="M21.805 10.023h-9.18v3.955h5.262c-.227 1.18-1.36 3.463-5.262 3.463-3.167 0-5.75-2.624-5.75-5.857s2.583-5.857 5.75-5.857c1.805 0 3.017.77 3.713 1.43l2.54-2.47C17.09 3.77 15.167 2.75 12.625 2.75 7.58 2.75 3.5 6.83 3.5 11.875s4.08 9.125 9.125 9.125c5.25 0 8.708-3.68 8.708-8.875 0-.595-.067-1.05-.153-1.477z"
                fill="#4285F4"
              />
              <path
                d="M12.625 21c2.33 0 4.28-.77 5.707-2.09l-2.707-2.21c-.75.5-1.75.8-3 .8-2.3 0-4.25-1.55-4.95-3.65H3.5v2.29C4.917 18.98 8.417 21 12.625 21z"
                fill="#34A853"
              />
              <path
                d="M7.675 13.85c-.2-.6-.325-1.25-.325-1.975s.125-1.375.325-1.975v-2.29H3.5A8.98 8.98 0 0 0 3 11.875c0 1.48.36 2.88.5 4.21l4.175-2.235z"
                fill="#FBBC05"
              />
              <path
                d="M18.332 7.21l2.54-2.47C19.708 3.77 17.785 2.75 15.243 2.75c-2.542 0-4.465 1.02-5.707 2.09l2.707 2.21c.75-.5 1.75-.8 3-.8 1.25 0 2.25.3 3 .8z"
                fill="#EA4335"
              />
            </g>
          </svg>
          <span className="text-nowrap ml-4">Continue with Google</span>
        </button>
        <button className=" text-nowrap flex items-center gap-2 bg-[#e6f9f3] text-black p-2 rounded-2xl w-full font-semibold">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"
              fill="#1877F3"
            />
          </svg>
          <span className="text-nowrap ml-4">Continue with Facebook</span>
        </button>
        <button className=" text-nowrap flex items-center gap-2 bg-[#e6f9f3] text-black p-2 rounded-2xl w-full font-semibold">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-.04-1.13.93-2.07 2.07-2.07zM21.6 17.25c-.29.67-.63 1.3-1.03 1.89-.68 1-1.38 1.99-2.5 2.01-1.09.02-1.44-.65-2.68-.65-1.24 0-1.62.63-2.65.67-1.07.04-1.89-1.08-2.57-2.08-1.4-2.04-2.47-5.77-1.03-8.3.72-1.28 2.01-2.09 3.42-2.09 1.08 0 1.76.68 2.66.68.89 0 1.47-.68 2.66-.68 1.13 0 2.33.62 3.05 1.7-2.68 1.4-2.58 5.06.39 6.45z"
              fill="#000"
            />
          </svg>
          <span className="text-nowrap ml-4">Continue with Apple</span>
        </button>
        <span className="text-white">
          Don't have an account <a className="text-emerald-500 font-bold underline">Sign up</a>
        </span>
        <span className="text-emerald-500 font-bold underline pointer">Forgot your password</span>
      </form>
    </div>
  );
};

export default HomePage;
