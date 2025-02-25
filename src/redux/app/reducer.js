import { INITIALIZED_SUCCESS, OPEN_MODAL, CLOSE_MODAL } from "./actionTypes";

const initialState = {
  initialized: false,
  modal: {
    isOpen: false,
    title: '',
    text: '',
    delay: 3000
  }
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return initializedSuccess(state);
    }

    case OPEN_MODAL: {
      return openModal(state, action.settings);
    }

    case CLOSE_MODAL: {
      return closeModal(state);
    }

    default:
      return state;
  }
};

const initializedSuccess = (state) => ({
  ...state,
  initialized: true,
});

const openModal = (state, {title='', text='', delay=3000}) => ({
  ...state,
  modal: {
    isOpen: true,
    title,
    text,
    delay
  }
});

const closeModal = (state) => ({
  ...state,
  modal: {
    ...state.modal,
    isOpen: false
  }
});

export default appReducer;
