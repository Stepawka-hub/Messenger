import { addPostAC } from './actions';
import profileReducer from './reducer';

test('length of posts should be incremented', () => {
  // Создаём action
  const action = addPostAC('IT-Test');

  // Вводим тестовый state (Два поста)
  const state = {
    posts: [
      {
        postid: 1,
        userid: 1,
        message: "Привет! - Post 1",
        username: "Stepawka",
      },
      {
        postid: 2,
        userid: 1,
        message: "Привет! - Post 2",
        username: "Stepawka",
      },
    ],
  };
    
  // Вызываем profileReducer, ожидая получить newState
  const newState = profileReducer(state, action);

  // Ожидание
  expect(newState.posts.length).toBe(3);
});