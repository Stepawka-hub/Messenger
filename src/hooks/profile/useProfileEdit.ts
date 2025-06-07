import { useDispatch } from "@store";
import { useRef, useState } from "react";

export const useProfileEdit = (userid: number, isOwner: boolean) => {
  // const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const formRef = useRef(null);

  const activateEditMode = () => isOwner && setEditMode(true);
  const deactivateEditMode = () => {
    if (editMode && isOwner) {
      setEditMode(false);
    }
  };

  // const saveData = () => formRef.current?.submit();

  // const onSubmit = (formData) => {
  //   const data = convertFormToProfile(formData, userid);
  //   dispatch(updateProfileAsync(data));
  //   deactivateEditMode();
  // };

    // useEffect(() => {
  //   deactivateEditMode();
  // }, [profile]);

  // const onSubmit = (formData) => {
  //   const {
  //     aboutMe,
  //     lookingForAJobDescription,
  //     fullName,
  //     github,
  //     vk,
  //     facebook,
  //     instagram,
  //     twitter,
  //   } = formData;
  //   const lookingForAJob = formData.lookingForAJob.toLowerCase() === "да";

  //   const data = {
  //     userId: profile.userId,
  //     aboutMe,
  //     fullName,
  //     lookingForAJob,
  //     lookingForAJobDescription,
  //     contacts: {
  //       github,
  //       vk,
  //       facebook,
  //       instagram,
  //       twitter,
  //       website: "",
  //       youtube: "",
  //       mainLink: "",
  //     },
  //   };

  //   props.updateUserProfile(data);
  // };

  return {
    editMode,
    formRef,
    activateEditMode,
    deactivateEditMode,
    // saveData,
    // onSubmit,
  };
};
