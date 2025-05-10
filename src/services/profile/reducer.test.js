import { addPostAC, deletePostAC } from './actions';
import profileReducer from './reducer';

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

test('length of posts should be incremented', () => {
  // Создаём action
  const action = addPostAC('IT-Test');
    
  // Вызываем profileReducer, ожидая получить newState
  const newState = profileReducer(state, action);

  // Ожидание
  expect(newState.posts.length).toBe(3);
});

test('message of new post should be correct', () => {
  // Создаём action
  const action = addPostAC('IT-Test');
    
  // Вызываем profileReducer, ожидая получить newState
  const newState = profileReducer(state, action);

  // Ожидание
  expect(newState.posts[2].message).toBe('IT-Test');
});

test('afted deleting post length of posts should be decremented', () => {
  // Создаём action
  const action = deletePostAC(1);
    
  // Вызываем profileReducer, ожидая получить newState
  const newState = profileReducer(state, action);

  // Ожидание
  expect(newState.posts.length).toBe(1);
});