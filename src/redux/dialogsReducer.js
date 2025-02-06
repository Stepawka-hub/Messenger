import avatarBlack from "./../assets/images/black.png";
import avatarOrange from "./../assets/images/avatar_orange.jpg";

const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

const initialState = {
  dialogs: [
    {
      dialogid: 1,
      username: "Stepawka",
      avatar: avatarBlack,
    },
    {
      dialogid: 2,
      username: "Maxim",
      avatar: avatarOrange,
    },
    {
      dialogid: 3,
      username: "Denis",
      avatar: avatarBlack,
    },
    {
      dialogid: 4,
      username: "Alexander",
      avatar: avatarBlack,
    },
    {
      dialogid: 5,
      username: "Ruslan",
      avatar: avatarBlack,
    },
  ],
  messages: [
    {
      msgid: 1,
      userid: 1,
      username: "Stepawka",
      avatar: avatarBlack,
      text: "Hello!",
    },
    {
      msgid: 2,
      userid: 2,
      username: "Maxim",
      avatar: avatarOrange,
      text: "How are you?",
    },
    {
      msgid: 3,
      userid: 1,
      username: "Stepawka",
      avatar: avatarBlack,
      text: "I`m fine, thank you!",
    },
  ],
  newMessageText: "",
}

const dialogsReducer = (state = initialState, action) => { 
  switch (action.type) {
    case SEND_MESSAGE: {
      return sendMessage(state);
    }

    case UPDATE_NEW_MESSAGE_TEXT: {
      return updateNewMessageText(state, action.newMessageText);
    }

    default: return state;
  }
}

const sendMessage = (state) => {
  if (!state.newMessageText) return state;

  const message = {
    msgid: 4,
    userid: 1,
    username: "Stepawka",
    avatar: avatarBlack,
    text: state.newMessageText,
  };

  return {
    ...state,
    messages: [...state.messages, message],
    newMessageText: ''
  };
}

const updateNewMessageText = (state, messageText) => {
  return {
    ...state,
    newMessageText: messageText
  };
}

export const sendMessageAC = () => ({ type: SEND_MESSAGE });

export const updateNewMessageTextAC = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newMessageText: text,
});

export default dialogsReducer;