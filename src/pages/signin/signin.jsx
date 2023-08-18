import styles from "./signin.module.scss";
import CustomInput from "#components/custom-input/custom-input";
import CustomButton from "#components/custom-button/custom-button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signinUser } from "#api/auth.req";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import { endFetching, setUser, startFetching } from "#redux/user/user.actions";
import { setAccessToken } from "#api/api";
const signinSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  password: z.string().nonempty({ message: "Password is required" }),
});
function SigninPage({ pushFlash, setUser, startFetching, endFetching }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signinSchema),
  });
  const signinMutation = useMutation(signinUser, {
    onError: (err) => {
      console.log(err);
      pushFlash({
        type: "error",
        message: err?.response?.data?.message || "something went wrong",
      });
    },
  });
  function handleSignin(data) {
    console.log({ data });
    signinMutation.mutate(data, {
      onSuccess: async (res) => {
        console.log({ res });
        if (res?.data?.message == "verification pending") {
          pushFlash({
            type: "success",
            message: "Please verify your email",
          });
          return navigate("/verify-otp", { state: { email: data.email } });
        }
        pushFlash({
          type: "success",
          message: "Signin successfull",
        });
        await startFetching();
        await setUser(res.data.user);
        setAccessToken(res?.data?.accessToken);
        await endFetching();
        navigate("/profile");
      },
    });
  }
  const signinRef = useRef(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    setSectionHeight(signinRef.current.offsetHeight);
  }, [signinRef]);
  return (
    <div className={styles.signinPage}>
      <div className={styles.container}>
        <section>
          <form
            ref={signinRef}
            className={styles.inputsContainer}
            onSubmit={handleSubmit(handleSignin)}
          >
            <h1 className={styles.title}>SIGN IN</h1>
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
              autoComplete="current-password"
            />
            <CustomButton>SIGN IN</CustomButton>
          </form>
          <p className={styles.fp}>forgot password?</p>
        </section>
        <div className={styles.seperator}></div>
        <section style={{ height: sectionHeight || "auto" }}>
          <h1 className={styles.title}>CREATE AN ACCOUNT</h1>
          <p>
            If you don't yet have an TDB account, please create one now so you
            can easily access your TDB Members Program details and order
            information in My Account.
          </p>
          <CustomButton onClick={() => navigate("/signup")}>
            CREATE AN ACCOUNT
          </CustomButton>
        </section>
      </div>
    </div>
  );
}

export default connect(null, {
  pushFlash,
  setUser,
  startFetching,
  endFetching,
})(SigninPage);
