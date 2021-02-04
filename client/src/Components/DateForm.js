import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateForm = (props) => {

  const [value, setValue] = useState(props.initialValue);

  const handleOnChange = (date) => {
    setValue(date);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.handleChange(props.field, value)
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <DatePicker selected={Date.parse(value) ? Date.parse(value) : new Date()} 

      onChange={date => handleOnChange(date)} />
  );
} 

export default DateForm