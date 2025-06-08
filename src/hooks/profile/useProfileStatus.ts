import { useDispatch } from "@store";
import { updateProfileStatusAsync } from "@thunks/profile";

export const useProfileStatus = () => {
  const dispatch = useDispatch();

  const updateStatus = (status: string) => {
    dispatch(updateProfileStatusAsync(status));
  };

  return { updateStatus };
};
