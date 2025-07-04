import { TSocialUser } from "@types";
import { ReactNode } from 'react';

export type UserCardProps = {
  user: TSocialUser;
  actions?: ReactNode;
};
