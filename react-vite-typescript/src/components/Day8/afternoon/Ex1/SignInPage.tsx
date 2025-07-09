import { useState } from "react";
import { useLocation } from "react-router-dom";

const SignInPage = () => {
  const { email, name } = useLocation().state || {};
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('https://cdnb.artstation.com/p/assets/images/images/063/775/011/large/prime-archives-miles-by-rafli-fazli.jpg?1686317178')] bg-cover bg-center bg-no-repeat">
      <form className="flex flex-col gap-4 backdrop-blur-3xl p-6 rounded-2xl max-w-xs w-full box-content bg-black/70">
        <h2 className="text-white text-2xl font-bold mb-2">Log in</h2>
        <div className="flex items-center gap-3 bg-[#222] rounded-xl p-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-orM9sjzaIHgHyv5ffihlzjGU2kDKkBzaA&s"
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
          <div className="flex flex-col">
            <span className="text-white font-semibold leading-tight">{name}</span>
            <span className="text-gray-300 text-sm leading-tight">{email}</span>
          </div>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 rounded-lg border-2 border-black bg-[#f5f5f5] text-black pr-20"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 font-semibold"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? "Hide" : "View"}
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-xl font-bold text-base w-full hover:bg-green-600 transition"
        >
          Continue
        </button>
        <span className="text-emerald-400 font-semibold underline text-center cursor-pointer mt-2">
          Forgot your password?
        </span>
      </form>
    </div>
  );
};

export default SignInPage;
