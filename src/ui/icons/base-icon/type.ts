import { ReactNode } from 'react';
import { IconProps } from '../types';

export type BaseIconProps = IconProps & {
  path: string;
  viewBox?: string;
  children?: ReactNode;
}