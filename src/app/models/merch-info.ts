export interface MerchInfo {
  id: number;
  title: string;
  informations: string[];
  picture: string;
  declinations: MerchDeclination[];
}

export interface MerchDeclination {
  mainColor: string;
  logoColor: string;
  picture : string;
}
