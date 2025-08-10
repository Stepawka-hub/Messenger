import { FC } from "react";
import { ProfileContactsProps } from "./type";
import { CONTACT_ORDER, contactNames } from "@utils/constants";
import { getSafeValue } from "@utils/helpers";
import { ProfileContactsItem } from "./profile-contacts-item";
import s from "./profile-contacts.module.css";

const getValue = getSafeValue("-");

export const ProfileContacts: FC<ProfileContactsProps> = ({ contacts }) => {
  const contactElements = CONTACT_ORDER.map((key) => {
    const value = contacts[key];

    return (
      <ProfileContactsItem
        key={key}
        label={contactNames[key]}
        value={getValue(value)}
      />
    );
  });

  return (
    <div className={s.contacts}>
      <h3 className={s.title}>Контакты</h3>
      <section>{contactElements}</section>
    </div>
  );
};
