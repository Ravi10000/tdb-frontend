import styles from "./signup.module.scss";
import CustomInput from "#components/custom-input/custom-input";
import CustomButton from "#components/custom-button/custom-button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "#api/auth.req";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";

const registerFormSchema = z
  .object({
    firstName: z
      .string()
      .nonempty({ message: "First name is required" })
      .min(2, { message: "First name is too short" }),
    lastName: z
      .string()
      .nonempty({ message: "Last name is required" })
      .min(2, { message: "Last name is too short" }),
    email: z
      .string()
      .nonempty({
        message: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password is too short, min 8 char" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" }),
  })
  .refine(
    (data) => {
      console.log({ data });
      return data?.password === data?.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );
function SignupPage({ pushFlash }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const registerMutation = useMutation(registerUser, {
    onError: (error) => {
      console.log({ error });
      const errMsg = error?.response?.data?.message;
      if (errMsg === "user exists")
        pushFlash({
          type: "error",
          message: "User already exists with this email.",
        });
    },
  });

  async function handleRegisterUser(data) {
    delete data.confirmPassword;
    console.log({ data });
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        console.log({ response });
        reset();
        pushFlash({
          type: "success",
          message: "An OTP has been sent to your email.",
        });
        navigate("/verify-otp", { state: { email: data.email } });
      },
    });
  }

  return (
    <div className={styles.signinPage}>
      <div className={styles.container}>
        <section>
          <form
            className={styles.inputsContainer}
            onSubmit={handleSubmit(handleRegisterUser)}
          >
            <h1 className={styles.title}>CREATE AN ACCOUNT</h1>
            <CustomInput
              placeholder="First Name"
              register={{ ...register("firstName") }}
              error={errors?.firstName?.message}
              autoComplete="first-name"
            />
            <CustomInput
              placeholder="Last Name"
              register={{ ...register("lastName") }}
              error={errors?.lastName?.message}
              autoComplete="last-name"
            />
            <CustomInput
              placeholder="Email"
              register={{ ...register("email") }}
              error={errors?.email?.message}
              autoComplete="email"
            />
            <CustomInput
              type="password"
              placeholder="Password"
              register={{ ...register("password") }}
              error={errors?.password?.message}
              autoComplete="new-password"
            />
            <CustomInput
              type="password"
              placeholder="Confirm Password"
              register={{ ...register("confirmPassword") }}
              error={errors?.confirmPassword?.message}
              autoComplete="new-password"
            />
            <CustomButton>CREATE ACCOUNT</CustomButton>
          </form>
        </section>
        <div className={styles.seperator}></div>
        <section>
          <h1 className={styles.title}>ALREADY HAVE AN ACCOUNT?</h1>
          <p>
            Sign in to your account to access your TDB Members Program details
            and order information in My Account.
          </p>
          <CustomButton onClick={() => navigate("/signin")}>
            TRY SIGN IN
          </CustomButton>
        </section>
      </div>
    </div>
  );
}

export default connect(null, { pushFlash })(SignupPage);
