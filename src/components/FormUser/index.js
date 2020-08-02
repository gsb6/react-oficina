import React, { useState } from 'react';

import FormField from "../../components/FormField";

function FormUser({ initialValues, onSubmit, buttonText }) {
  const [formValues, setFormValues] = useState([
    { name: 'name', value: initialValues.name || ''},
    { name: 'register', value: initialValues.register || '' },
    { name: 'day', value: initialValues.day || ''},
    { name: 'course', value: initialValues.course || ''}
  ]);

  console.log('initialValues', initialValues);

  const onChange = (name, value) => {
    let filterFormValues = formValues.filter(formValue => formValue.name !== name); 
    filterFormValues.push({ name, value });
    setFormValues(filterFormValues);
  };

  return (
    <form onSubmit={onSubmit}>
      <FormField label="Nome" 
        name="name" 
        value={formValues.find( formValue => formValue.name === 'name').value} 
        type="text" 
        onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      <FormField 
        label="Matricula" 
        name="register" 
        type="number" 
        value={formValues.find( formValue => formValue.name === 'register').value}
      />
      <div>
        <label>Curso: </label>
        <select 
          name="course">
          <option value="1"> 1</option>
        </select>
      </div>
      <FormField 
        label="Dia" 
        name="day" 
        type="number" 
        value={formValues.find(formValue => formValue.name === 'day').value}
      />
      <FormField label="Mês" name="month" type="number" />
      <FormField label="Ano" name="year" type="number" />
      <FormField label="CEP" name="cep" type="number" />
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default FormUser;