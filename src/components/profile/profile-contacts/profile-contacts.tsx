import { FC } from "react";
import { ProfileContactsProps } from "./type";
import { contactNames } from "@utils/constants";
import { TContacts } from "@types";
import { getSafeValue } from "@utils/helpers/values-helpers";
import { ProfileContactsItem } from "./profile-contacts-item";
import s from "./profile-contacts.module.css";

const getValue = getSafeValue("-");

export const ProfileContacts: FC<ProfileContactsProps> = ({ contacts }) => {
  console.log(contacts);
  const contactsEntries = Object.entries(contacts);
  const contactElements = contactsEntries.map(([key, value]) => {
    if (key in contactNames) {
      const contactKey = key as keyof TContacts;
      return (
        <ProfileContactsItem
          key={key}
          label={contactNames[contactKey]}
          value={getValue(value)}
        />
      );
    }
    return null;
  });

  return (
    <div className={s.contacts}>
      <h3 className={s.title}>Контакты</h3>
      <section>{contactElements}</section>
    </div>
  );
};
