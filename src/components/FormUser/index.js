import React, { useState } from 'react';

import FormField from '../../components/FormField';
import Select from '../../components/Select';
import axios from 'axios';
import './styles.css';

function FormUser({
  goBack,
  initialValues,
  onSubmit,
  buttonSubmitText,
  buttonCancelText,
}) {
  const [formValues, setFormValues] = useState([
    { name: 'name', value: initialValues.name || '' },
    { name: 'register', value: initialValues.register || '' },
    { name: 'day', value: initialValues.day || '' },
    { name: 'course', value: initialValues.course || '' },
    { name: 'month', value: initialValues.month || '' },
    { name: 'year', value: initialValues.year || '' },
    { name: 'cep', value: initialValues.cep || '' },
    { name: 'address', value: initialValues.address || '' },
    { name: 'number', value: initialValues.number || '' },
    { name: 'address_detail', value: initialValues.address_detail || '' },
    { name: 'district', value: initialValues.district || '' },
    { name: 'status', value: initialValues.status },
  ]);

  console.log(
    'status',
    initialValues,
    formValues.find((value) => value.name === 'status').value
  );
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
          formValue.name !== 'district' &&
          formValue.name !== 'address_detail' &&
          formValue.name !== 'number' &&
          formValue.name !== 'address' &&
          formValue.name !== 'cep'
      );
      filterFormValues.push({ name: 'district', value: data.bairro });
      filterFormValues.push({
        name: 'address_detail',
        value: data.complemento,
      });
      filterFormValues.push({ name: 'number', value: '' });
      filterFormValues.push({ name: 'address', value: data.logradouro });
      filterFormValues.push({ name: 'cep', value: data.cep });
      setFormValues(filterFormValues);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: formValues.find((value) => value.name === 'name').value,
      register: formValues.find((value) => value.name === 'register').value,
      course: formValues.find((value) => value.name === 'course').value,
      birthDate: `${formValues.find((value) => value.name === 'year').value}-${
        formValues.find((value) => value.name === 'month').value
      }-${formValues.find((value) => value.name === 'day').value}`,
      cep: formValues.find((value) => value.name === 'cep').value,
      address: formValues.find((value) => value.name === 'address').value,
      number: formValues.find((value) => value.name === 'number').value,
      address_detail: formValues.find(
        (value) => value.name === 'address_detail'
      ).value,
      district: formValues.find((value) => value.name === 'district').value,
      status: formValues.find((value) => value.name === 'status').value,
      image: '/assets/teste.png',
    };
    onSubmit(newUser);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, formValues)}>
      <div className="containerForm">
        <div className="contentForm">
          <div style={{ width: '50%' }}>
            <FormField
              label="Nome"
              placeholder="Nome"
              name="name"
              width="100%"
              value={
                formValues.find((formValue) => formValue.name === 'name').value
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
                  formValues.find((formValue) => formValue.name === 'register')
                    .value
                }
              />
              <Select
                name="course"
                value={
                  formValues.find((formValue) => formValue.name === 'course')
                    .value
                }
                label="Curso"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                width="49%"
                options={[
                  { label: 'React', value: 'React' },
                  { label: 'Node', value: 'Node' },
                ]}
              />
            </div>
            <p className="labelInput">Data de nascimento</p>
            <div className="rowFields">
              <FormField
                placeholder="Dia"
                name="day"
                min="1"
                max="31"
                type="number"
                width={'30%'}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={
                  formValues.find((formValue) => formValue.name === 'day').value
                }
              />
              <FormField
                placeholder="Mês"
                min="1"
                max="12"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={
                  formValues.find((formValue) => formValue.name === 'month')
                    .value
                }
                width={'30%'}
                name="month"
                type="number"
              />
              <FormField
                width={'30%'}
                placeholder="Ano"
                min={1900}
                name="year"
                type="number"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={
                  formValues.find((formValue) => formValue.name === 'year')
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
                formValues.find((formValue) => formValue.name === 'cep').value
              }
              name="cep"
              type="text"
            />
            <FormField
              placeholder="Logradouro"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              value={
                formValues.find((formValue) => formValue.name === 'address')
                  .value
              }
              name="address"
              type="text"
            />
            <div className="rowFields">
              <FormField
                width="50%"
                placeholder="Número"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                value={
                  formValues.find((formValue) => formValue.name === 'number')
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
                    (formValue) => formValue.name === 'address_detail'
                  ).value
                }
                name="address_detail"
                type="text"
              />
            </div>
            <FormField
              placeholder="Bairro"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              value={
                formValues.find((formValue) => formValue.name === 'district')
                  .value
              }
              name="district"
              type="text"
            />
            <p className="labelInput">Status</p>
            <div className="radioFields">
              <input
                type="radio"
                name="status"
                onChange={(e) => onChange(e.target.name, true)}
                checked={
                  formValues.find((formValue) => formValue.name === 'status')
                    .value === true
                }
                value={true}
              />
              <label className="labelInput" for="active">
                Ativo
              </label>
              <input
                type="radio"
                name="status"
                onChange={(e) => onChange(e.target.name, false)}
                checked={
                  formValues.find((formValue) => formValue.name === 'status')
                    .value === false
                }
                value={false}
              />
              <label className="labelInput" for="inactive">
                Inativo
              </label>
            </div>
          </div>
          <div style={{ width: '50%', padding: '20px' }}></div>
        </div>
        <span className="line" />
        <div className="footerForm">
          <button type="button" className="buttonCancel" onClick={goBack}>
            {buttonCancelText}
          </button>
          <button type="submit" className="primary-button">
            {buttonSubmitText}
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormUser;
