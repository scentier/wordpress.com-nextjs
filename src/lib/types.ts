type TAuthor = {
  name: string;
  avatar_URL: string;
};

type TComment = {
  comment_count: number;
};

export type TPost = {
  ID: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featured_image?: string;
  author: TAuthor;
  discussion: TComment;
};

export type TPostContent = TPost & {
  content: string;
};
