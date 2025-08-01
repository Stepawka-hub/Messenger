import { getIsUpdatingProfile } from "@slices/profile";
import { useDispatch, useSelector } from "@store";
import { updateProfileAsync } from "@thunks/profile";
import { TProfile } from "@types";
import { SubmitHandler } from "react-hook-form";
import { TProfileEditForm } from "@components/profile/profile-edit-form/types";

export const useProfileEdit = (profile: TProfile) => {
  const dispatch = useDispatch();
  const isUpdatingProfile = useSelector(getIsUpdatingProfile);

  const { contacts, ...rest } = profile;
  const initialValues: TProfileEditForm = {
    ...rest,
    ...contacts,
  };

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
  };

  return {
    initialValues,
    isUpdatingProfile,
    onSubmit,
  };
};
