import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const validatePasswordMatch = (value) => {
    return value === password || "Password and Confirm Password don't match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword,
    };

    try {
      const res = await axios.post(
        "/api/user/signup",
        userInfo
      );

      if (res.data) {
        alert("Signup successful! You can now log in.");
        localStorage.setItem("messanger", JSON.stringify(res.data));
        setAuthUser(res.data);
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white px-6 py-3 rounded-md space-y-3 w-96"
      >
        <h1 className="text-2xl items-center text-blue-600 font-semibold">
          Chat-app
        </h1>
        <h2 className="text-2xl">
          Create a new{" "}
          <span className="text-blue-600 font-semibold">Account</span>
        </h2>
        <br />

        {/* Username */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Username"
            {...register("name", { required: true })}
          />
        </label>
        {errors.name && (
          <span className="text-red-600 text-sm">
            **This field is required**
          </span>
        )}

        {/* Email */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
        </label>
        {errors.email && (
          <span className="text-red-600 text-sm">
            **{errors.email.message}**
          </span>
        )}

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            {...register("password", { required: "This field is required" })}
          />
        </label>
        {errors.password && (
          <span className="text-red-600 text-sm">
            **{errors.password.message}**
          </span>
        )}

        {/* Confirm password */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Confirm password"
            {...register("confirmpassword", {
              required: "This field is required",
              validate: validatePasswordMatch,
            })}
          />
        </label>
        {errors.confirmpassword && (
          <span className="text-red-600 text-sm">
            **{errors.confirmpassword.message}**
          </span>
        )}

        {/* Submit button */}
        <div className="flex justify-center">
          <input
            type="submit"
            value="Signup"
            className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2"
          />
        </div>

        <p>
          Have an account?{" "}
          <span
            className="text-blue-500 underline cursor-pointer ml-1"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
