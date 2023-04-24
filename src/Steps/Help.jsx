import React, { useEffect } from "react";
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
    setState({ ...state, ...data });
    navigate("/help");
  };

  useEffect(() => {
    if (String(watchPassword).length > 6) {
      alert("Lenght exceeded");
    }
  }, [String(watchPassword)]);

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <legend>Contact</legend>
        <Field label="First name" error={errors?.firstName}>
          <Input
            {...register("firstName", { required: "First name is required" })}
            id="first-name"
          />
        </Field>

        <Input
          {...register("password", { required: "Password is empty" })}
          id="password"
        />

        <select {...register("gender")}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>

        <Button>Next {">"}</Button>
      </fieldset>
    </Form>
  );
};
