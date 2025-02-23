export type ResultApiEvent = {
  data: Event[];
};

export type Event = {
  id: number;
  title: string;
  slug: string;
  description: string;
  banner: string;
  started: string;
  ended: string;
  fee: number;
  location: string;
  longitude: string;
  latitude: string;
  for: string;
  created_at?: string;
  updated_at?: string;
};

export type FormDataEvent = {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  banner?: string;
  startedDate?: string;
  startedTime?: string;
  endedDate?: string;
  endedTime?: string;
  fee?: string | number;
  marker?: {
    lat?: number;
    lng?: number;
  };
  location?: string;
  maximumVisitor?: string;
  for?: string;
  created_at?: string;
  updated_at?: string;
};
