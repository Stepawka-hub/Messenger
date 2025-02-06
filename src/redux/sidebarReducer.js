import avatarOrange from "./../assets/images/avatar_orange.jpg";
import avatarBlack from "./../assets/images/black.png";

const initialState = {
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
}

const sidebarReducer = (state = initialState, action) => {
  return state;
}

export default sidebarReducer;