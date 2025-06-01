// UncontrolledForm.js
// ✅ Form Uncontrolled – Không dùng thư viện (quản lý qua useRef)

import React, { useRef, useState } from "react";

export default function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [errors, setErrors] = useState({});

  const validate = (name, email, password, confirmPassword) => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required.";
    else if (name.length < 2) errs.name = "Name must be at least 2 characters.";
    else if (name.length > 50)
      errs.name = "Name must be less than 50 characters.";

    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      errs.email = "Email is invalid.";

    if (!password) errs.password = "Password is required.";
    else if (password.length < 8)
      errs.password = "Password must be at least 8 characters.";

    if (!confirmPassword)
      errs.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password)
      errs.confirmPassword = "Passwords do not match.";

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const errs = validate(name, email, password, confirmPassword);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      alert(
        "Uncontrolled Form submitted:\n" +
          JSON.stringify({ name, email, password }, null, 2)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-block">
      <h2>Uncontrolled Form (No Library)</h2>
      <div>
        <label>Name:</label>
        <br />
        <input name="name" ref={nameRef} />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label>Email:</label>
        <br />
        <input name="email" ref={emailRef} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Password:</label>
        <br />
        <input type="password" name="password" ref={passwordRef} />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <br />
        <input
          type="password"
          name="confirmPassword"
          ref={confirmPasswordRef}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
