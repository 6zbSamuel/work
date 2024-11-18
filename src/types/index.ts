export interface Country {
  id: number;
  name: string;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  details: CountryDetails;
  sports: SportMedal[];
}

export interface CountryDetails {
  population: number;
  capital: string;
  continent: string;
  flag: string;
  countryCode: string;
}

export interface SportMedal {
  sport: string;
  medalType: 'gold' | 'silver' | 'bronze';
}

export interface Comment {
  id: number;
  countryId: number;
  text: string;
  timestamp: Date;
} 