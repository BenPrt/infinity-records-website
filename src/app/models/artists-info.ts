export interface ArtistInformations {
  id: number;
  name: string;
  type: string;
  cover_picture: string;
  cover_picture_mobile: string;
  logo_picture: string;
  url_facebook: string;
  url_instagram: string;
  url_youtube: string;
  url_soundcloud: string;
  url_spotify: string;
  url_deezer: string;
  description: string;
  metadata_description : string;
  metadata_keywords : string;
  projects: ProjectInformations[];
  clips: string[];
}

export interface ProjectInformations {
  id: number;
  title: string;
  duration: string;
  releaseDate: string;
  coverPath: string;
  soundcloudUrl : string;
  downloadPath: string;
  tracks: TrackInformations[];
}

export interface TrackInformations {
  title: string;
  soundcloudUrl: string;
}
