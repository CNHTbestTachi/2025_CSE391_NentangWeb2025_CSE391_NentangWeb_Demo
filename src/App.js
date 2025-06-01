// App.js
import React, { useState } from "react";
import ControlledForm from "./form/ControlledForm";
import UncontrolledForm from "./form/UncontrolledForm";
import FormikForm from "./form/FormikForm";
import HookForm from "./form/HookForm";
import "./App.css";

const formOptions = [
  { id: "controlled", name: "Controlled Form", component: <ControlledForm /> },
  {
    id: "uncontrolled",
    name: "Uncontrolled Form",
    component: <UncontrolledForm />,
  },
  { id: "formik", name: "Formik + Yup", component: <FormikForm /> },
  { id: "hookform", name: "React Hook Form", component: <HookForm /> },
];

export default function App() {
  const [selected, setSelected] = useState("controlled");

  return (
    <div className="app-container">
      <h1>🧪 So sánh các cách quản lý Form trong React</h1>
      <div className="tab-selector">
        {formOptions.map((form) => (
          <button
            key={form.id}
            className={selected === form.id ? "tab active" : "tab"}
            onClick={() => setSelected(form.id)}
          >
            {form.name}
          </button>
        ))}
      </div>
      <div className="form-area">
        {formOptions.find((f) => f.id === selected)?.component}
      </div>
    </div>
  );
}
