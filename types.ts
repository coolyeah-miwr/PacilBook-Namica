export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  year: number;
  field?: 'Citra' | 'Jaringan' | 'Tertanam';
}

export interface User {
  name: string;
  email: string;
  password?: string;
  phone: string;
  nim: string;
  profilePicture: string; // URL to the image
}

export type View = 'rak' | 'punyaku' | 'pengaturan' | 'privasi' | 'bantuan' | 'bag';

export interface FilterOptions {
  from: string;
  to: string;
  fields: {
    citra: boolean;
    jaringan: boolean;
    tertanam: boolean;
  };
}

export interface Notification {
  id: string;
  type: 'success' | 'update' | 'security';
  message: string;
  timestamp: number;
  isRead: boolean;
}

export interface Folder {
    id: string;
    name: string;
    books: Book[];
}