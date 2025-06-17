import { SubmitHandler } from "react-hook-form";

export type AddPostFormProps = {
  onSubmit: SubmitHandler<TAddPostForm>;
};

export type TAddPostForm = {
  postText: string;
};
