import React, { useState } from "react";

import FormField from "../../components/FormField";
import Select from "../../components/Select";
import axios from "axios";
import "./styles.css";

function FormUser({
  goBack,
  initialValues,
  onSubmit,
  buttonSubmitText,
  buttonCancelText,
}) {
  const [formValues, setFormValues] = useState([
    { name: "name", value: initialValues.name || "" },
    { name: "register", value: initialValues.register || "" },
    { name: "day", value: initialValues.day || "" },
    { name: "course", value: initialValues.course || "" },
    { name: "month", value: initialValues.month || "" },
    { name: "year", value: initialValues.year || "" },
    { name: "cep", value: initialValues.cep || "" },
    { name: "logradouro", value: initialValues.logradouro || "" },
    { name: "number", value: initialValues.number || "" },
    { name: "address_details", value: initialValues.addressDetails || "" },
    { name: "district", value: initialValues.district || "" },
  ]);

  const onChange = (name, value) => {
    let filterFormValues = formValues.filter(
      (formValue) => formValue.name !== name
    );
    filterFormValues.push({ name, value });
    setFormValues(filterFormValues);
  };

  const onChangeByCep = async (value) => {
    const { data } = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
    if (data) {
      let filterFormValues = formValues.filter(
        (formValue) =>
          formValue.name !== "district" &&
          formValue.name !== "address_details" &&
          formValue.name !== "number" &&
          formValue.name !== "logradouro" &&
          formValue.name !== "cep"
      );
      filterFormValues.push({ name: "district", value: data.bairro });
      filterFormValues.push({
        name: "address_details",
        value: data.complemento,
      });
      filterFormValues.push({ name: "number", value: "" });
      filterFormValues.push({ name: "logradouro", value: data.logradouro });
      filterFormValues.push({ name: "cep", value: data.cep });
      setFormValues(filterFormValues);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="containerForm">
        <div className="contentForm">
          <div style={{ width: "50%" }}>
            <FormField
              label="Nome"
              placeholder="Nome"
              name="name"
              width="100%"
              value={
                formValues.find((formValue) => formValue.name === "name").value
              }
              type="text"
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            <div className="rowFields">
              <FormField
                placeholder="Matrícula"
                label="Matricula"
                name="register"
                type="number"
                width="49%"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={
                  formValues.find((formValue) => formValue.name === "register")
                    .value
                }
              />
              <Select
                name="course"
                value={
                  formValues.find((formValue) => formValue.name === "course")
                    .value
                }
                label="Curso"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                width="49%"
                options={[
                  { label: "React", value: "React" },
                  { label: "Node", value: "Node" },
                ]}
              />
            </div>
            <p className="labelInput">Data de nascimento</p>
            <div className="rowFields">
              <FormField
                placeholder="Dia"
                name="day"
                type="number"
                width={"30%"}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={
                  formValues.find((formValue) => formValue.name === "day").value
                }
              />
              <FormField
                placeholder="Mês"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={
                  formValues.find((formValue) => formValue.name === "month")
                    .value
                }
                width={"30%"}
                name="month"
                type="number"
              />
              <FormField
                width={"30%"}
                placeholder="Ano"
                name="year"
                type="number"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={
                  formValues.find((formValue) => formValue.name === "year")
                    .value
                }
              />
            </div>
            <p className="labelInput">Endereço</p>
            <FormField
              placeholder="CEP"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onChangeByCep(e.target.value)}
              value={
                formValues.find((formValue) => formValue.name === "cep").value
              }
              name="cep"
              type="text"
            />
            <FormField
              placeholder="Logradouro"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              value={
                formValues.find((formValue) => formValue.name === "logradouro")
                  .value
              }
              name="logradouro"
              type="text"
            />
            <div className="rowFields">
              <FormField
                width="50%"
                placeholder="Número"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={
                  formValues.find((formValue) => formValue.name === "number")
                    .value
                }
                name="number"
                type="number"
              />
              <FormField
                width="50%"
                placeholder="Complemento"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={
                  formValues.find(
                    (formValue) => formValue.name === "address_details"
                  ).value
                }
                name="address_details"
                type="text"
              />
            </div>
            <FormField
              placeholder="Bairro"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              value={
                formValues.find((formValue) => formValue.name === "district")
                  .value
              }
              name="district"
              type="text"
            />
          </div>
          <div style={{ width: "50%", padding: "20px" }}></div>
        </div>
        <span className="line" />
        <div className="footerForm">
          <button type="button" className="buttonCancel" onClick={goBack}>
            {buttonCancelText}
          </button>
          <button type="submit" className="buttonSubmit">
            {buttonSubmitText}
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormUser;
