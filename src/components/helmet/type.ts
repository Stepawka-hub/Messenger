export type MetaTag = {
  name: string;
  content: string;
};

export type HelmetProps = {
  title?: string;
  description?: string;
  noIndex?: boolean;
  meta?: MetaTag[];
};
