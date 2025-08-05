export type FormattedTextProps = {
  content: string;
  classes?: {
    link?: string;
    text?: string;
  },
  openLinksInNewTab?: boolean;
  replaceLineBreaks?: boolean;
}