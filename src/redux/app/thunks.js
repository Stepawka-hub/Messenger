import { getAuthUserData } from "../auth/thunks";
import { initializedSuccessAC } from './actions';

export const initializeApp = () => (dispatch) => {
  const getAuthPromise = dispatch(getAuthUserData());

  Promise.all([getAuthPromise]).then(() => {
    dispatch(initializedSuccessAC());
  });
};