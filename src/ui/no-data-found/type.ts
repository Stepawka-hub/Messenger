import { ReactNode } from 'react';

export type NoDataFoundProps = {
  label?: string;
  children?: ReactNode;
  classes?: {
    container?: string;
    label?: string;
  }
}