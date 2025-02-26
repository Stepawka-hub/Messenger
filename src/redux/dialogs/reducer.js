import avatarBlack from "./../../assets/images/black.png";
import avatarOrange from "./../../assets/images/avatar_orange.jpg";
import { SEND_MESSAGE } from './actionTypes';

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
      text: "Привет!",
    },
    {
      msgid: 2,
      userid: 2,
      username: "Maxim",
      avatar: avatarOrange,
      text: "*Какое-то сообщение*",
    },
    {
      msgid: 3,
      userid: 1,
      username: "Stepawka",
      avatar: avatarBlack,
      text: "*Какой-то классный ответ*",
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

export default dialogsReducer;