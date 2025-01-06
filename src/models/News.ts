export type ResultApiNews = {
  data: News[];
};

export type News = {
  id: number;
  title: string;
  description: string;
  slug: string;
  cover: string;
  body: string;
  created_at?: string;
  updated_at?: string;
};
