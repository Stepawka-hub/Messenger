import { FC } from "react";
import { FormattedTextProps } from "./types";
import Linkify from "linkify-react";
import s from "./formatted-text.module.css";
import { unescapeHtml } from "@utils/helpers";

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
  const htmlSafeText = unescapeHtml(formattedContent);
  console.log(htmlSafeText);

  return (
    <Linkify
      as="span"
      options={{
        attributes: {
          className: linkClass,
          target: openLinksInNewTab ? "_blank" : undefined,
          rel: openLinksInNewTab ? "noopener noreferrer" : undefined,
        },
        render: {
          render: ({ content }) => {
            const phoneRegex = /(\+?\d[\d\s\-()]{7,}\d)/g;
            const phoneMatch = content.match(phoneRegex);

            if (phoneMatch && phoneMatch[0] === content) {
              const cleanPhone = phoneMatch[0].replace(/[\s\-()]/g, "");
              return (
                <a href={`tel:${cleanPhone}`} className={s.link}>
                  {content}
                </a>
              );
            }
            return <span>{content}</span>;
          },
        },
      }}
    >
      <span className={textClass}>{htmlSafeText}</span>
    </Linkify>
  );
};
