import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    setValue(text);
  };

  return [value, onChangeText];
};

export default useInput;
