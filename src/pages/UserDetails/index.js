import React from "react";
import FormField from "../../components/FormField";

function UserDetails() {
  return (
    <div>
      <FormField label="Nome" name="name" type="text" />
      <FormField label="Matricula" name="register" type="number" />
      <div>
        <label>Curso: </label>
        <select name="course">
          <option value="1"> 1</option>
        </select>
      </div>
      <FormField label="Dia" name="day" type="number" />
      <FormField label="Mês" name="month" type="number" />
      <FormField label="Ano" name="year" type="number" />
      <FormField label="CEP" name="cep" type="number" />
    </div>
  );
}

export default UserDetails;
