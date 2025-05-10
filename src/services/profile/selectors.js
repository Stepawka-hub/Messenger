export const getProfilePage = (state) => state.profilePage;

export const getPosts = (state) => getProfilePage(state).posts;

export const getProfileSelector = (state) => getProfilePage(state).profile;

export const getStatusSelector = (state) => getProfilePage(state).status;

export const getIsUpdatingPhoto = (state) => getProfilePage(state).isUpdatingPhoto;