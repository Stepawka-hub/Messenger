import { TextareaAutosizeProps } from "react-textarea-autosize";

export interface TextareaProps extends TextareaAutosizeProps {
  classes?: {
    wrapper?: string;
    label?: string;
    textarea?: string;
    error?: string;
  };
  label?: string;
  error?: string;
}
