import { FC } from "react";
import { ProfileContactsProps } from "./type";
import { profileContacts } from "@utils/constants";
import { TContacts } from "@types";
import { getSafeValue } from "@utils/helpers/values-helpers";
import { ProfileInfoItem } from "../profile-info-item";
import s from "./profile-contacts.module.css";

const getValue = getSafeValue("-");

export const ProfileContacts: FC<ProfileContactsProps> = ({ contacts }) => {
  const contactsKeys = Object.keys(contacts);
  const contactElements = contactsKeys.map((key, i) => {
    if (key in profileContacts) {
      const contactKey = key as keyof TContacts;
      return (
        <ProfileInfoItem
          isContact
          label={profileContacts[contactKey]}
          value={getValue(contactKey)}
          key={i}
        />
      );
    }
  });

  return (
    <div className={s.contacts}>
      <h3 className={s.title}>Контакты</h3>
      <section>{contactElements}</section>
    </div>
  );
};
