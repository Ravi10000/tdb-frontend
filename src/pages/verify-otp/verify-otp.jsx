import styles from "./verify-otp.module.scss";
import CustomButton from "#components/custom-button/custom-button";
import CustomInput from "#components/custom-input/custom-input";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "#api/auth.req";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import { endFetching, setUser, startFetching } from "#redux/user/user.actions";
import { setAccessToken } from "#api/api";

function VerifyOTPPage({ pushFlash, setUser, startFetching, endFetching }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const otpSchema = z.object({
    otp: z.string().nonempty({ message: "OTP is required" }).length(6, {
      message: "OTP must be 6 digits",
    }),
  });

  useEffect(() => {
    if (!state?.email) navigate("/");
  }, [state]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(otpSchema),
  });
  const verifyMutation = useMutation(verifyOTP, {
    onError: (err) => {
      console.log(err);
      pushFlash({
        message:
          err?.response?.data?.message ||
          "something went wrong, please try again",
        type: "error",
      });
    },
  });

  function handleVerifyOTP(data) {
    verifyMutation.mutate(
      { ...data, email: state?.email },
      {
        onSuccess: async (res) => {
          console.log({ res });
          pushFlash({ message: "Verification successfull", type: "success" });
          await startFetching();
          await setUser(res.data.user);
          setAccessToken(res.data.accessToken);
          await endFetching();
          reset();
          navigate("/profile");
        },
      }
    );
  }

  return (
    <div className={styles.verifyOTPPage}>
      <div className={styles.container}>
        <h1>VERIFY OTP</h1>
        <p>
          An email with verification OTP has been sent to your provided email
          address.
        </p>
        <form onSubmit={handleSubmit(handleVerifyOTP)}>
          <CustomInput
            otp
            maxLength="6"
            inputMode="numeric"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            placeholder="OTP"
            register={{ ...register("otp") }}
            error={errors?.otp?.message}
          />
          <CustomButton>VERIFY</CustomButton>
        </form>
      </div>
    </div>
  );
}

export default connect(null, {
  pushFlash,
  setUser,
  startFetching,
  endFetching,
})(VerifyOTPPage);
