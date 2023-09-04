import styles from "./users-popup.module.scss";
import WithPopup from "#components/with-popup/with-popup";
import CustomInput from "#components/custom-input/custom-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "#api/auth.req";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";

function UsersPopup({ close, pushFlash }) {
  const schema = z.object({
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
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const res = await registerUser(data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log({ data });
      pushFlash({ message: "User created successfully", type: "success" });
      close();
    },
    onError: (error) => {
      console.log({ error });
      pushFlash({ message: error?.response?.data?.message, type: "error" });
    },
  });
  const handleCreateUser = (data) => {
    console.log({ data });
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(handleCreateUser)}>
      <WithPopup title="Add User" close={close}>
        <CustomInput
          placeholder="User's First Name"
          register={{ ...register("firstName") }}
          error={errors.firstName?.message}
        />
        <CustomInput
          placeholder="User's Last Name"
          register={{ ...register("lastName") }}
          error={errors.lastName?.message}
        />
        <CustomInput
          placeholder="User's Email"
          register={{ ...register("email") }}
          error={errors.email?.message}
        />
        <CustomInput
          type="password"
          placeholder="User's Password"
          register={{ ...register("password") }}
          error={errors.password?.message}
        />
      </WithPopup>
    </form>
  );
}

export default connect(null, { pushFlash })(UsersPopup);
