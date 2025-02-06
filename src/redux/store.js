import avatarBlack from "./../images/black.png";
import avatarOrange from "./../images/avatar_orange.jpg";

import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';

const store = {
  _state: {
    profilePage: {
      posts: [
        {
          postid: 1,
          userid: 1,
          message: "Привет! - Post 1",
          username: "Stepawka",
          avatar: avatarBlack,
        },
        {
          postid: 2,
          userid: 1,
          message: "Привет! - Post 2",
          username: "Stepawka",
          avatar: avatarBlack,
        },
      ],
      newPostText: "",
    },

    dialogsPage: {
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
    },

    sidebar: {
      friends: [
        {
          userid: 2,
          username: "Maxim",
          avatar: avatarOrange,
        },
        {
          userid: 3,
          username: "Denis",
          avatar: avatarBlack,
        },
        {
          userid: 4,
          username: "Alexander",
          avatar: avatarBlack,
        },
        {
          userid: 5,
          username: "Ruslan",
          avatar: avatarBlack,
        },
      ],
    },
  },

  get state() {
    return this._state;
  },

  _callSubscriber(store) {},

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this);
  },
};

window.store = store;

export default store;
