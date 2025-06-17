import s from "./my-posts.module.css";
import { addPost, getPosts } from "@slices/profile";
import { FC } from "react";
import { useDispatch, useSelector } from "@store";
import { Post } from "../post";
import { TAddPostForm } from "../add-post-form/types";
import { SubmitHandler } from "react-hook-form";
import { AddPostForm } from "../add-post-form";

export const MyPosts: FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  const onSubmit: SubmitHandler<TAddPostForm> = (formData) => {
    dispatch(addPost(formData.postText));
  };

  return (
    <section>
      <h3 className={s.title}>My posts</h3>

      <div className={s.formContainer}>
        <AddPostForm onSubmit={onSubmit} />
      </div>

      <section className={s.postList}>
        {posts.map(({ id, avatar, message }) => (
          <Post key={id} id={id} avatar={avatar} message={message} />
        ))}
      </section>
    </section>
  );
};
