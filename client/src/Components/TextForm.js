import React, { useState, useEffect } from 'react';

const TextForm = (props) => {

  const [value, setValue] = useState(props.initialValue);

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log(event)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.handleChange(props.field, value)
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <form onSubmit={e => { e.preventDefault();}}>
      <input type={props.field === 'cost' || props.field === 'volume' ? 'number' : 'text'} 
          onChange={handleOnChange} value={value}  />
    </form>
  );
} 

export default TextForm