import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return initializedSuccess(state);
    }

    default:
      return state;
  }
};

const initializedSuccess = (state) => ({
  ...state,
  initialized: true,
});

// Action Creator
const initializedSuccessAC = () => ({
  type: INITIALIZED_SUCCESS,
});

// Thunk
export const initializeApp = () => (dispatch) => {
  const getAuthPromise = dispatch(getAuthUserData());
  console.log(getAuthPromise);

  Promise.all([getAuthPromise]).then(() => {
    dispatch(initializedSuccessAC());
  });
};

export default appReducer;
