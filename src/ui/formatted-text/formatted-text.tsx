import { FC } from "react";
import { FormattedTextProps } from "./types";
import Linkify from "linkify-react";
import s from "./formatted-text.module.css";

export const FormattedText: FC<FormattedTextProps> = ({
  content,
  classes,
  openLinksInNewTab = true,
  replaceLineBreaks = true,
}) => {
  const textClass = classes?.text || s.text;
  const linkClass = classes?.link || s.link;

  const formattedContent = replaceLineBreaks
    ? content.replace(/<br \/>/g, "\n")
    : content;

  return (
    <Linkify
      as="span"
      options={{
        attributes: {
          className: linkClass,
          target: openLinksInNewTab ? "_blank" : undefined,
          rel: openLinksInNewTab ? "noopener noreferrer" : undefined,
        },
      }}
    >
      <span className={textClass}>{formattedContent}</span>
    </Linkify>
  );
};
