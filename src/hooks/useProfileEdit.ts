import { getIsUpdatingProfile } from "@slices/profile";
import { useDispatch, useSelector } from "@store";
import { updateProfileAsync } from "@thunks/profile";
import { TProfile } from "@types";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { TProfileEditForm } from "@components/profile/profile-edit-form/types";

export const useProfileEdit = (profile: TProfile, isOwner: boolean) => {
  const dispatch = useDispatch();
  const isUpdatingProfile = useSelector(getIsUpdatingProfile);
  const [editMode, setEditMode] = useState(false);

  const { contacts, ...rest } = profile;
  const initialValues: TProfileEditForm = {
    ...rest,
    ...contacts,
  };

  const activateEditMode = () => isOwner && setEditMode(true);

  const deactivateEditMode = () => setEditMode(false);

  const onSubmit: SubmitHandler<TProfileEditForm> = (formData) => {
    const {
      vk,
      github,
      facebook,
      instagram,
      twitter,
      website,
      youtube,
      mainLink,
      ...rest
    } = formData;

    const updatedProfile: TProfile = {
      ...profile,
      ...rest,
      contacts: {
        github,
        vk,
        facebook,
        instagram,
        twitter,
        website,
        youtube,
        mainLink,
      },
    };

    dispatch(updateProfileAsync(updatedProfile));
    deactivateEditMode();
  };

  return {
    initialValues,
    isUpdatingProfile,
    editMode,
    activateEditMode,
    deactivateEditMode,
    onSubmit,
  };
};
