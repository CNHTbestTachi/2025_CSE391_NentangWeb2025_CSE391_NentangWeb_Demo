// HookForm.js
// ✅ Form Uncontrolled – Dùng react-hook-form để quản lý và validate form

import React from "react";
import { useForm } from "react-hook-form";

export default function HookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    alert("React Hook Form submitted:\n" + JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-block">
      <h2>React Hook Form</h2>
      <div>
        <label>Name:</label>
        <br />
        <input
          {...register("name", {
            required: "Name is required.",
            minLength: { value: 2, message: "Minimum 2 characters." },
            maxLength: { value: 50, message: "Maximum 50 characters." },
          })}
        />
        {errors.name && <div className="error">{errors.name.message}</div>}
      </div>
      <div>
        <label>Email:</label>
        <br />
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Email is invalid.",
            },
          })}
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
      </div>
      <div>
        <label>Password:</label>
        <br />
        <input
          type="password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
            },
          })}
        />
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}
      </div>
      <div>
        <label>Confirm Password:</label>
        <br />
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password.",
            validate: (value) =>
              value === password || "Passwords do not match.",
          })}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword.message}</div>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
