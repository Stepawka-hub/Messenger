import { INITIALIZED_SUCCESS } from './actionTypes';

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

export default appReducer;
