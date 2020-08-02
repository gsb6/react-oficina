import React from "react";
import "./styles.css";

function FormField({
  onBlur,
  label,
  type,
  name,
  value,
  onChange,
  width,
  placeholder,
}) {
  return (
    <div style={{ maxWidth: width }} className="inputWrapper">
      {label && <label className="label">{label}</label>}
      <input
        onBlur={onBlur}
        placeholder={placeholder}
        className="formField"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormField;
