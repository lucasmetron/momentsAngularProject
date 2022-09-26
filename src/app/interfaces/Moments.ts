export interface Moment {
  id?: number;
  title: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
  coments: Coment[];
}

interface Coment {
  text: string;
  userName: string;
}
