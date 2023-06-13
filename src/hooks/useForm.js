import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [valuesInput, setValuesInput] = useState(initialState);

  const handleReset = () => {
    setValuesInput(initialState);
  }

  const handleInputChange = ({target}) => {
    setValuesInput({
      ...valuesInput,
      [target.name]:target.value
    });
  }

  return {
    valuesInput, setValuesInput, handleInputChange, handleReset
  }
}