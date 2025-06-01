// ControlledForm.js
// ✅ Form Controlled – Không dùng thư viện (quản lý state qua useState)

import React, { useState } from "react";

export default function ControlledForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    else if (form.name.length < 2)
      errs.name = "Name must be at least 2 characters.";
    else if (form.name.length > 50)
      errs.name = "Name must be less than 50 characters.";

    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      errs.email = "Email is invalid.";

    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters.";

    if (!form.confirmPassword)
      errs.confirmPassword = "Please confirm your password.";
    else if (form.confirmPassword !== form.password)
      errs.confirmPassword = "Passwords do not match.";

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert("Controlled Form submitted:\n" + JSON.stringify(form, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-block">
      <h2>Controlled Form (No Library)</h2>
      <div>
        <label>Name:</label>
        <br />
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label>Email:</label>
        <br />
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <br />
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
