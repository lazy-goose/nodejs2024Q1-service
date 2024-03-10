export type ID = string;
export type AutoIncrementInt = number;
export type Int = number;
export type Timestamp = number;

export interface User {
  id: ID;
  login: string;
  password: string;
  version: AutoIncrementInt;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Album {
  id: ID;
  name: string;
  year: Int;
  artistId: Artist['id'] | null;
}

export interface Artist {
  id: ID;
  name: string;
  grammy: boolean;
}

export interface Track {
  id: ID;
  name: string;
  artistId: Artist['id'] | null;
  albumId: Album['id'] | null;
  duration: Int;
}

export interface Favorites {
  albums: Array<Album['id']>;
  artists: Array<Artist['id']>;
  tracks: Array<Track['id']>;
}
