import { StaffInfo } from 'src/app/models/staff-info';

export const staffInfos: StaffInfo[] = [
  {
    id: 0,
    name: 'Ben',
    picture: 'assets/img/label/staff_ben.jpg',
    quote: 'If time is money, I need a loan !',
    quoteAuthor: 'G-Eazy',
    mainRole: 'LABEL_ROLE_HEADMASTER',
    otherRoles: [
      'LABEL_ROLE_PRODUCER',
      'LABEL_ROLE_ARTIST',
      'LABEL_ROLE_COMMUNITY_MANAGER',
      'LABEL_ROLE_SOFTWARE_ENGINEER',
    ],
  },
  {
    id: 1,
    name: 'Kate',
    picture: 'assets/img/label/staff_kate.jpg',
    quote: 'Graphic design will save the world right after rock and roll does.',
    quoteAuthor: 'David Carson',
    mainRole: 'LABEL_ROLE_DESIGNER',
    otherRoles: ['LABEL_ROLE_PHOTOGRAPHER'],
  },
  {
    id: 2,
    name: 'Max',
    picture: 'assets/img/label/staff_max.jpg',
    quote: 'The music starts where the power of words stops.',
    quoteAuthor: 'Richard Wagner',
    mainRole: 'LABEL_ROLE_VIDEOGRAPHER',
    otherRoles: ['LABEL_ROLE_ARTIST', 'LABEL_ROLE_COMMUNITY_MANAGER'],
  },
];
