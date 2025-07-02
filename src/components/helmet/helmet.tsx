import { FC } from "react";
import { HelmetProps } from "./type";

export const Helmet: FC<HelmetProps> = ({
  title,
  description,
  noIndex = false,
  meta = [],
}) => (
  <>
    <title>{title || "Social Network"}</title>
    <meta
      name="description"
      content={
        description ||
        "Общайтесь, делитесь и открывайте новое – ваше личное пространство для связи с миром"
      }
    />
    <meta
      name="keywords"
      content="социальная сеть, общение, друзья, знакомства, новости, фото, видео, блоги, сообщества"
    />
    <meta name="author" content="Львов Степан" />
    {noIndex && <meta name="robots" content="noindex" />}
    {meta.map(({ name, content }) => (
      <meta key={name} name={name} content={content} />
    ))}
  </>
);
