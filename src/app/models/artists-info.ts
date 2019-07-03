export interface ArtistInfo {
  id: number;
  name: string;
  type: string;
  cover_picture: string;
  logo_picture: string;
  url_facebook: string;
  url_instagram: string;
  url_youtube: string;
  url_soundcloud: string;
  url_spotify: string;
  url_deezer: string;
  description: string;
  projects: ProjectInfo[];
  clips: string[];
}

export interface ProjectInfo {
  id: number;
  title: string;
  duration: string;
  releaseDate: string;
  coverPath: string;
  downloadPath: string;
  tracks: TrackInfo[];
}

export interface TrackInfo {
  id: number;
  title: string;
  soundcloudUrl: string;
}
