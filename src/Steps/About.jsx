// Steps/About.js

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Field, Form } from "../Forms";
import useLocalstorage from "../hooks/use-local-storage";
import { useAppState } from "../state";

export const About = () => {
  const [state, setState] = useAppState();
  const { handleSubmit, register } = useForm({ defaultValues: state });
  const navigate = useNavigate();

  const { saveDataToLocalStorage } = useLocalstorage("user-data", state);
  const saveData = (data) => {
    setState({ ...state, ...data });
    navigate("/confirm");
    saveDataToLocalStorage();
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <legend>About</legend>
        <Field label="About me">
          <textarea
            {...register("about")}
            id="about"
            className="form-control"
          />
        </Field>
        <div className="button-row">
          <Link className={`btn btn-secondary`} to="/education">
            {"<"} Previous
          </Link>
          <Button>Next {">"}</Button>
        </div>
      </fieldset>
    </Form>
  );
};
