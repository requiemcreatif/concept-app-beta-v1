import React from "react";
import { useDispatch } from "react-redux";
import { handleChange } from "../../redux/userSlice/userSlice";

const InputForm = ({ type, name, value, labelText, handleCodeInput }) => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(handleChange({ name: event.target.name, value: event.target.value }));
  };

  return (
    <div>
      <div className="form-input">
        <label htmlFor={name}>{labelText || name}</label>
        <input type={type} value={value} name={name} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default InputForm;
