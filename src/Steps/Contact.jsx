// Steps/Contact.js

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Field, Form, Input } from "../Forms";
import { CopyButton } from "../Forms/Button";
import { useAppState } from "../state";

export const Contact = () => {
  const [state, setState] = useAppState();
  const { handleSubmit, register, watch, formState } = useForm({
    defaultValues: state,
    mode: "onSubmit",
  });
  const watchPassword = watch("password");
  const navigate = useNavigate();

  const saveData = (data) => {
    setState({ ...state, ...data });
    alert(JSON.stringify(state));
    navigate("/education");
  };

  console.log("watchPassword", watchPassword);

  // copy password button beside password
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard

  const ref = useRef(null);

  const copyTextToClipboard = async (text) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  const [isCopied, setIsCopied] = useState(false);

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(state?.password)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <legend>Contact</legend>
        <Field label="First name" error={formState.errors?.firstName}>
          <Input
            {...register("firstName", { required: "First name is required" })}
            id="first-name"
          />
        </Field>
        <Field label="Last name" error={formState.errors?.lastName}>
          <Input
            {...register("lastName", { required: "Last name is required" })}
            id="last-name"
          />
        </Field>
        <Field label="Email" error={formState.errors?.email}>
          <Input
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
          />
        </Field>

        <Field label="Password" error={formState.errors?.password}>
          <Input
            ref={ref}
            {...register("password", { required: "Password is required" })}
            type="password"
            id="password"
          />
        </Field>

        <CopyButton onClick={handleCopyClick}>
          <span>{isCopied ? "Copied!" : "Copy"}</span>
        </CopyButton>

        <Field
          label="Confirm password"
          error={formState.errors?.confirmPassword}
        >
          <Input
            {...register("confirmPassword", {
              required: "Confirm the password",
              validate: (value) =>
                value === watchPassword || "The passwords do not match",
            })}
            type="password"
            id="password-confirm"
          />
        </Field>
        <Button>Next {">"}</Button>
      </fieldset>
    </Form>
  );
};
