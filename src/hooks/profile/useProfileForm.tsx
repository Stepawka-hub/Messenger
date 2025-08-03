import { SubmitHandler } from "react-hook-form";
import { getIsUpdatingProfile } from "@slices/profile";
import { useDispatch, useSelector } from "@store";
import { updateProfileAsync } from "@thunks/profile";
import { ProfileEditForm, TProfileEditForm } from "@components/profile";
import { TProfile } from "@types";
import { useModal } from "@hooks";

export const useProfileForm = (profile: TProfile) => {
  const dispatch = useDispatch();
  const isUpdatingProfile = useSelector(getIsUpdatingProfile);

  const { showModal, hideModal } = useModal();

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
    hideModal();
  };

  const openEditForm = () => {
    showModal(
      <ProfileEditForm
        initialValue={initialValues}
        disabled={isUpdatingProfile}
        onSubmit={onSubmit}
        onCancel={hideModal}
      />
    );
  };

  return {
    openEditForm,
    isUpdatingProfile
  }
};
