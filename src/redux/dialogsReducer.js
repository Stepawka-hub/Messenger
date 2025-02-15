import avatarBlack from "./../assets/images/black.png";
import avatarOrange from "./../assets/images/avatar_orange.jpg";

const SEND_MESSAGE = "SEND-MESSAGE";

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
  ]
}

const dialogsReducer = (state = initialState, action) => { 
  switch (action.type) {
    case SEND_MESSAGE: {
      return sendMessage(state, action.newMessageText);
    }

    default: return state;
  }
}

const sendMessage = (state, newMessageText) => {
  if (!newMessageText) return state;

  const message = {
    msgid: state.messages.length + 1,
    userid: 1,
    username: "Stepawka",
    avatar: avatarBlack,
    text: newMessageText,
  };

  return {
    ...state,
    messages: [...state.messages, message]
  };
}

export const sendMessageAC = (newMessageText) => ({ 
  type: SEND_MESSAGE,
  newMessageText
});

export default dialogsReducer;