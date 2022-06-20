import { TextField, StandardTextFieldProps } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

interface InputProps extends StandardTextFieldProps {
  name: string;
  inputsObject?: Record<string, unknown>;
  validationFn?: (value: unknown) => string | null;
}

const Input = ({
  inputsObject = {},
  name,
  inputProps,
  error,
  helperText,
  validationFn,
  ...props
}: InputProps) => {
  const [validationText, setValidationText] = useState<string | null>(null);
  const value = useMemo(() => inputsObject[name], [inputsObject[name]]);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (
      !isFirstRun.current &&
      typeof validationFn === "function" &&
      !props.disabled
    ) {
      setValidationText(validationFn(value));
    }
  }, [inputsObject, props.disabled]);

  useEffect(() => {
    isFirstRun.current = false;
  }, []);

  return (
    <TextField
      error={error || !!validationText}
      helperText={helperText || validationText}
      fullWidth
      variant="outlined"
      name={name}
      value={value ?? props.value}
      inputProps={{
        "aria-label": name,
        ...inputProps,
      }}
      {...props}
    />
  );
};

export default Input;
