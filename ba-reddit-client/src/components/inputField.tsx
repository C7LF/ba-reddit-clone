import React, { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/core";
import { useField } from "formik";

// set input field to take regular input type props.
type inputField = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  isTextArea?: boolean;
};

const InputField: React.FC<inputField> = ({
  label,
  isTextArea,
  size: _,
  ...props
}) => {
  let InputComponent = Input
  if (isTextArea) {
    InputComponent = Textarea;
  }

  const [field, { error }] = useField(props);

  //   cast error to boolean with !!
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputComponent
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
