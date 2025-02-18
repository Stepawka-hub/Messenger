export const getProfilePage = (state) => state.profilePage;

export const getProfileSelector = (state) => getProfilePage(state).profile;

export const getStatusSelector = (state) => getProfilePage(state).status;