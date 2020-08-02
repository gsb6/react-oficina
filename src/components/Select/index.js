import React from 'react';

import './styles.css';

function Select ({ 
  options, value, onChange, placeholder, width, name
}) {
  return (
    <select value={value} onChange={onChange} className='selectStyled' style={{ width }} name={name}>
      <option value=''>Todos</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

export default Select;