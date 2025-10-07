import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Alert from "../components/Alert";
import * as yup from "yup";

function LoginPage() {
  return (
    <AuthContext.Consumer>
      {(dataLogin) => <Form dataLogin={dataLogin} />}
    </AuthContext.Consumer>
  );
}

const LoginFormSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function Form({ dataLogin }) {
  const navigate = useNavigate();
  const [alertStatus, setAlertStatus] = useState({ type: "", message: "" });
  useEffect(() => {
    if (dataLogin) {
      navigate("/");
    }
  }, [dataLogin, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (formData) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (user) {
        dataLogin.setUserLogin(formData);
        setAlertStatus({ type: "success", message: "Login successful!" });
      } else {
        setAlertStatus({ type: "error", message: "Invalid email or password" });
      }
    } catch (error) {
      setAlertStatus({
        type: "error",
        message: "Login failed. Please try again." + error,
      });
    }
  };

  return (
    <main className="h-screen justify-items-center content-center">
      <Alert
        type={alertStatus.type}
        message={alertStatus.message}
        onClose={() => setAlertStatus({ type: "", message: "" })}
      />
      <div className="grid w-full max-w-4xl grid-cols-2 overflow-hidden rounded-xl bg-white shadow-lg">
        <div>
          <img
            className="h-full w-full object-cover"
            src="/public/img/illustration.png"
            alt=""
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-4 p-8 md:p-12"
          noValidate
        >
          <div className="text-3xl font-bold">Login to your account</div>
          <div className="text-slate-500 mb-4">
            See what is going on with your business
          </div>
          <Input
            type="email"
            id="email"
            placeholder="mail@abc.com"
            {...register("email")}
            error={errors}
          >
            Email
          </Input>
          <Input
            type="password"
            id="password"
            placeholder="********"
            {...register("password")}
            error={errors}
          >
            Password
          </Input>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#7F265B] p-3 font-bold text-white transition-colors duration-300 hover:bg-[#591e41] focus:ring-2 focus:ring-[#7F265B] focus:ring-offset-2 mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
