import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [dataArray, setDataArray] = useState([]);
  const [errors, setErrors] = useState({ name: '', email: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    const newErrors = { name: '', email: '' };
    let isValid = true;
    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setDataArray([...dataArray, formData]);
      setFormData({ name: '', email: '' });
    }
  };

  return (
    <div>
      <h1>Form Validation </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
      <h2>Stored Data:</h2>
      <ul>
        {dataArray.map((data, index) => (
          <li key={index}>
            {data.name} - {data.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
