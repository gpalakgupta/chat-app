import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "/api/user/login",
        userInfo
      );

      if (res.data) {
        alert("Login successful!");
        localStorage.setItem("messanger", JSON.stringify(res.data));
        setAuthUser(res.data);
        navigate("/"); // Redirect to home
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white px-6 py-3 rounded-md space-y-3 w-96"
      >
        <h1 className="text-2xl text-blue-600 font-semibold">Chat-app</h1>
        <h2 className="text-2xl">
          Login with your{" "}
          <span className="text-blue-600 font-semibold">Account</span>
        </h2>
        <br />

        {/* Email */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Email"
            {...register("email", { required: "This field is required" })}
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

        {/* Submit */}
        <div className="flex justify-center">
          <input
            type="submit"
            value="Login"
            className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2"
          />
        </div>

        <p>
          Don't have an account?{" "}
          <span
            className="text-blue-500 underline cursor-pointer ml-1"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
