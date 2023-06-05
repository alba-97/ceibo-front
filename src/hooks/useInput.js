import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (text) => {
    setValue(text);
  };

  return [value, handleChange];
};

export default useInput;
