// FormikForm.js
// ✅ Form Controlled – Dùng Formik + Yup để quản lý và validate form

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required.")
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be less than 50 characters."),
      email: Yup.string()
        .required("Email is required.")
        .email("Email is invalid."),
      password: Yup.string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match.")
        .required("Please confirm your password."),
    }),
    onSubmit: (values) => {
      alert("Formik Form submitted:\n" + JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-block">
      <h2>Formik + Yup Form</h2>
      {["name", "email", "password", "confirmPassword"].map((field) => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          <br />
          <input
            name={field}
            type={field.includes("password") ? "password" : "text"}
            value={formik.values[field]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched[field] && formik.errors[field] && (
            <div className="error">{formik.errors[field]}</div>
          )}
        </div>
      ))}
      <button type="submit">Register</button>
    </form>
  );
}
