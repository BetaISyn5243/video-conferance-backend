import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface IFormikTextField {
  formik: any;
  fieldName: string;
  label?: string;
  placeHolder?: string;
  textFieldProps?: TextFieldProps;
  type: React.InputHTMLAttributes<unknown>["type"];
}
const FormikTextField: React.FC<IFormikTextField> = (
  props: IFormikTextField
) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={props.fieldName}
      label={props.label}
      placeholder={props.placeHolder}
      type={props.type}
      id={props.fieldName}
      onChange={props.formik.handleChange}
      onBlur={props.formik.handleBlur}
      value={props.formik.values[props.fieldName]}
      {...props.formik.getFieldProps(props.fieldName)}
      {...props.textFieldProps}
    />
  );
};
export default FormikTextField;
