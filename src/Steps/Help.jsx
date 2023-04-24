import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Field, Form, Input } from "../Forms";
import { useAppState } from "../state";

export const Help = () => {
  const [state, setState] = useAppState();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });
  const navigate = useNavigate();
  const watchPassword = watch("password");
  const saveData = (data) => {
    console.log(data);
    setState({ ...state, ...data });
    navigate("/");
  };

  // useEffect(() => {
  //   if (String(watchPassword).length > 6) {
  //     alert("Lenght exceeded");
  //   }
  // }, [watchPassword]);

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <legend>Contact</legend>
        <Field label="First name" error={errors?.firstName}>
          <Input
            {...register("firstName", { required: "First name is required" })}
            id="first-name-1"
          />
        </Field>

        <Field label="Last name" error={errors?.firstName}>
          <Input
            {...register("lastName", {
              required: "Last name name is required",
            })}
            id="last-name-1"
          />
        </Field>

        <Input
          {...register("password", { required: "Password is empty" })}
          id="password-1"
        />

        <select {...register("gender")}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>

        <Button disabled={String(watchPassword).length <= 3}>Next {">"}</Button>
      </fieldset>
    </Form>
  );
};
