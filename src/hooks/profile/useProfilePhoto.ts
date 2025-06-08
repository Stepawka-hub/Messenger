import { useDispatch } from "@store";
import { updateProfilePhotoAsync } from "@thunks/profile";

export const useProfilePhoto = (isOwner: boolean) => {
  const dispatch = useDispatch();

  const onUpdatePhoto = async (photo: File) => {
    if (!isOwner) return;
    await dispatch(updateProfilePhotoAsync(photo));
  };

  return { onUpdatePhoto };
};
