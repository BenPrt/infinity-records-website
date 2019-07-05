import { ArtistInformations } from 'src/app/models/artists-info';

export const artistsInfos: ArtistInformations[] = [
  {
    id: 1,
    name: 'PRT Crew',
    type: 'Hip-Hop / Rap',
    cover_picture: 'assets/img/artists/prt_crew/cover.jpg',
    logo_picture: 'assets/img/artists/prt_crew/logo.jpg',
    url_facebook: 'https://www.facebook.com/prtcrew/',
    url_instagram: '',
    url_youtube: 'https://www.youtube.com/channel/UCdJYZ8kZvYMxMao3ucr_AbA',
    url_soundcloud: 'https://soundcloud.com/prtcrew/',
    url_spotify: 'https://open.spotify.com/artist/3bT1MhtM1FwJu8ksqxnMLO',
    url_deezer: 'https://www.deezer.com/fr/artist/15199683',
    description: 'ARTISTS_PRT-CREW_DESCRIPTION',
    projects: [
      {
        id: 1,
        title: 'PRTape Vol. 1',
        duration: '24:54',
        releaseDate: '2014/09/08',
        coverPath: 'assets/img/artists/prt_crew/prtape_1.jpg',
        downloadPath: 'assets/downloads/prt_crew/PRT_Crew-PRTape_Vol_1-2014.zip',
        tracks: [
          {
            id: 1,
            title: 'Introduction',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/introduction',
          },
          {
            id: 2,
            title: 'Parce Que',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/parce-que',
          },
          {
            id: 3,
            title: 'La Vie Est Une Toupie',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/la-vie-est-une-toupie',
          },
          {
            id: 4,
            title: 'Tu Sais Qui Fait Ça',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/tu-sais-qui-fait-ca',
          },
          {
            id: 5,
            title: 'A Fleur de Prose',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/a-fleur-de-prose',
          },
          {
            id: 6,
            title: 'Rêve Aérien',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/reve-aerien',
          },
          {
            id: 7,
            title: 'Poésie Moderne (feat Gus)',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/poesie-moderne-feat-gus',
          },
          {
            id: 8,
            title: 'Spectateurs de nos Vies',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/spectateurs-de-nos-vies',
          },
        ],
      },
      {
        id: 2,
        title: 'PRTape Vol. 2',
        duration: '25:05',
        releaseDate: '2019/05/17',
        coverPath: 'assets/img/artists/prt_crew/prtape_2.jpg',
        downloadPath: 'assets/downloads/prt_crew/PRT_Crew-PRTape_Vol_2-2019.zip',
        tracks: [
          {
            id: 1,
            title: 'Sombres Lumières',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/sombres-lumieres',
          },
          {
            id: 2,
            title: 'Un Truc Étrange',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/un-truc-etrange',
          },
          {
            id: 3,
            title: 'Chimères',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/chimeres-1',
          },
          {
            id: 4,
            title: 'Plaie Ouverte',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/plaie-ouverte',
          },
          {
            id: 5,
            title: 'Commotion',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/commotion',
          },
          {
            id: 6,
            title: 'Déversés',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/deverses-1',
          },
          {
            id: 7,
            title: 'La Valse Remix',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/la-valse-remix',
          },
          {
            id: 8,
            title: 'Une Seule Vie',
            soundcloudUrl: 'https://soundcloud.com/prtcrew/une-seule-vie-1',
          },
        ],
      },
    ],
    clips: ['https://www.youtube.com/watch?v=0HSpX3JMqWM', 'https://www.youtube.com/watch?v=HVXCVzaPDWA'],
  },
  {
    id: 2,
    name: 'Fresh Ben',
    type: 'Beatmaking',
    // cover_picture: 'assets/img/artists/fresh_ben/cover.jpg',
    cover_picture: '',
    // logo_picture: 'assets/img/artists/fresh_ben/logo.jpg',
    logo_picture: '',
    url_facebook: 'https://www.facebook.com/Fresh-Ben-1054138974781049/',
    url_instagram: 'https://www.instagram.com/fresh__ben/',
    url_youtube: 'https://www.youtube.com/channel/UCWgQhN1vY41SbMJ18TzvoGA',
    url_soundcloud: 'https://soundcloud.com/fresh_ben',
    url_spotify: '',
    url_deezer: '',
    description: 'ARTISTS_FRESH-BEN_DESCRIPTION',
    projects: [
      {
        id: 1,
        title: 'Fresh Beats',
        duration: '',
        releaseDate: '',
        coverPath: '',
        downloadPath: '',
        tracks: [
          {
            id: 1,
            title: 'Something\'s Strange',
            soundcloudUrl: 'https://soundcloud.com/fresh_ben/somethings-strange',
          },
          {
            id: 2,
            title: 'This Was Fast',
            soundcloudUrl: 'https://soundcloud.com/fresh_ben/this-was-fast',
          },
          {
            id: 3,
            title: 'August\'s Very Own',
            soundcloudUrl: 'https://soundcloud.com/fresh_ben/augusts-very-own',
          },
          {
            id: 4,
            title: 'Overstrain',
            soundcloudUrl: 'https://soundcloud.com/fresh_ben/overstrain',
          },
        ],
      },
    ],
    clips: [],
  },
];
