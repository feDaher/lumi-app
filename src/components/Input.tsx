import { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

export interface InputProps extends RNTextInputProps {
  className?: string;
}

const Input = forwardRef<RNTextInput, InputProps>(({ className, ...props }, ref) => {
  return <RNTextInput ref={ref} className={className} {...props} />;
});

Input.displayName = "Input";
export default Input;
