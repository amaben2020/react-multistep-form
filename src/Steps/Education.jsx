// Steps/Education.js

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Field, Form, Input } from "../Forms";
import useLocalstorage from "../hooks/use-local-storage";
import { useAppState } from "../state";

export const Education = () => {
  const [state, setState] = useAppState();
  const { handleSubmit, register } = useForm({ defaultValues: state });
  const navigate = useNavigate();

  const { saveDataToLocalStorage } = useLocalstorage("user-data", state);

  const saveData = (data) => {
    setState({ ...state, ...data });
    navigate("/about");
    saveDataToLocalStorage();
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <legend>Education</legend>
        <Field label="University">
          <Input {...register("university")} id="university" />
        </Field>
        <Field label="Degree">
          <Input {...register("degree")} id="degree" />
        </Field>
        <div className="button-row">
          <Link className={`btn btn-secondary`} to="/">
            {"<"} Previous
          </Link>
          <Button>Next {">"}</Button>
        </div>
      </fieldset>
    </Form>
  );
};
