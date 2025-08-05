import { FC } from "react";
import { FormattedTextProps } from "./types";
import { FIND_PHONES_REGEX, unescapeHtml } from "@utils/helpers";
import { LinkIt, LinkItEmail, LinkItUrl } from "react-linkify-it";
import s from "./formatted-text.module.css";

export const FormattedText: FC<FormattedTextProps> = ({
  content,
  classes,
  replaceLineBreaks = true,
}) => {
  const textClass = classes?.text || s.text;
  const linkClass = classes?.link || s.link;

  const formattedContent = replaceLineBreaks
    ? content.replace(/<br \/>/g, "\n")
    : content;
  const htmlSafeText = unescapeHtml(formattedContent);

  return (
    <LinkItUrl className={linkClass}>
      <LinkItEmail className={linkClass}>
        <LinkIt
          component={(match, key) => (
            <a key={key} className={linkClass} href={`tel:${match}`}>
              {match}
            </a>
          )}
          regex={FIND_PHONES_REGEX}
        >
          <span className={textClass}>{htmlSafeText}</span>
        </LinkIt>
      </LinkItEmail>
    </LinkItUrl>
  );
};
