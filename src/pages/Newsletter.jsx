import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

import { routes } from "./../router";
import asyncHandler from "./../helpers/asyncHandler";
import axios from "../lib/axios/newsletter";

export const action = async ({ request }) => {
  const [formData, error] = await asyncHandler(request.formData());

  if (error) return error;

  const data = Object.fromEntries(formData);

  const [response, responseError] = await asyncHandler(axios.post("", data));

  if (responseError) {
    return toast.error(responseError?.response?.data?.msg);
  }

  toast.success(response.data.msg);

  return redirect(routes.landing.path);
};

const NewsLetter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form className="form" method="POST">
      <h4
        style={{
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        our newsletter
      </h4>

      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name
        </label>

        <input
          type="text"
          name="name"
          id="name"
          className="form-input"
          placeholder="John"
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          last name
        </label>

        <input
          type="text"
          name="lastName"
          id="lastName"
          className="form-input"
          placeholder="Doe"
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>

        <input
          type="email"
          name="email"
          id="email"
          className="form-input"
          placeholder="test@test.com"
          defaultValue="test@test.com"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-block"
        style={{ marginTop: "0.5rem" }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "submitting" : "submit"}
      </button>
    </Form>
  );
};

export default NewsLetter;
