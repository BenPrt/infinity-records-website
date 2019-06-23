import { MerchInfo } from 'src/app/models/merch-info';

export const merchInfos: MerchInfo[] = [
  {
    id: 0,
    title: 'MERCH_TITLE_HOODIES',
    informations: [
      'MERCH_INFOS_DIGITAL_PRINTING',
      'MERCH_INFOS_COTTON_POLYESTER',
      'MERCH_INFOS_CLASSICAL_CUT',
      'MERCH_INFOS_GRAMMING_280',
      'MERCH_INFOS_MACHINE_WASHABLE',
    ],
    picture: 'assets/img/merch_hoodie_image.png',
    declinations: [
      { mainColor: 'MERCH_MAIN_BLACK', logoColor: 'MERCH_LOGO_GOLD', picture: 'assets/img/merch_preview.png' },
      { mainColor: 'MERCH_MAIN_BLACK', logoColor: 'MERCH_LOGO_WHITE', picture: 'assets/img/merch_preview.png' },
      { mainColor: 'MERCH_MAIN_WHITE', logoColor: 'MERCH_LOGO_BLACK', picture: 'assets/img/merch_preview.png' },
    ],
  },
  {
    id: 1,
    title: 'MERCH_TITLE_TSHIRTS',
    informations: [
      'MERCH_INFOS_DIGITAL_PRINTING',
      'MERCH_INFOS_FULL_COTTON',
      'MERCH_INFOS_CLASSICAT_CUT_ROUND',
      'MERCH_INFOS_GRAMMING_180',
      'MERCH_INFOS_MACHINE_WASHABLE',
    ],
    picture: 'assets/img/merch_hoodie_image.png',
    declinations: [
      { mainColor: 'MERCH_MAIN_BLACK', logoColor: 'MERCH_LOGO_GOLD', picture: 'assets/img/merch_preview.png' },
      { mainColor: 'MERCH_MAIN_BLACK', logoColor: 'MERCH_LOGO_WHITE', picture: 'assets/img/merch_preview.png' },
      { mainColor: 'MERCH_MAIN_WHITE', logoColor: 'MERCH_LOGO_BLACK', picture: 'assets/img/merch_preview.png' },
    ],
  },
  {
    id: 2,
    title: 'MERCH_TITLE_CREWNECKS',
    informations: [
      'MERCH_INFOS_DIGITAL_PRINTING',
      'MERCH_INFOS_COTTON_POLYESTER',
      'MERCH_INFOS_CLASSICAT_CUT_ROUND',
      'MERCH_INFOS_GRAMMING_280',
      'MERCH_INFOS_MACHINE_WASHABLE',
    ],
    picture: 'assets/img/merch_hoodie_image.png',
    declinations: [
      { mainColor: 'MERCH_MAIN_BLACK', logoColor: 'MERCH_LOGO_GOLD', picture: 'assets/img/merch_preview.png' },
      { mainColor: 'MERCH_MAIN_BLACK', logoColor: 'MERCH_LOGO_WHITE', picture: 'assets/img/merch_preview.png' },
      { mainColor: 'MERCH_MAIN_WHITE', logoColor: 'MERCH_LOGO_BLACK', picture: 'assets/img/merch_preview.png' },
    ],
  },
];
