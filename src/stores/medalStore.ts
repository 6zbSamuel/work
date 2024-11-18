import { defineStore } from 'pinia';
import { Country, Comment } from '../types';
import { ref } from 'vue';

export const useMedalStore = defineStore('medals', () => {
  const countries = ref<Country[]>([
    {
      id: 1,
      name: 'China',
      goldMedals: 38,
      silverMedals: 32,
      bronzeMedals: 18,
      details: {
        population: 1400000000,
        capital: 'Beijing',
        continent: 'Asia',
        flag: '🇨🇳',
        countryCode: 'CN'
      },
      sports: [
        { sport: 'Table Tennis', medalType: 'gold' },
        { sport: 'Table Tennis Team', medalType: 'gold' },
        { sport: 'Diving', medalType: 'gold' },
        { sport: 'Diving Team', medalType: 'gold' },
        { sport: 'Weightlifting', medalType: 'gold' },
        { sport: 'Weightlifting Women', medalType: 'gold' },
        { sport: 'Gymnastics', medalType: 'gold' },
        { sport: 'Artistic Gymnastics', medalType: 'gold' },
        { sport: 'Trampoline', medalType: 'gold' },
        { sport: 'Shooting', medalType: 'gold' },
        { sport: 'Swimming', medalType: 'gold' },
        { sport: 'Synchronized Swimming', medalType: 'silver' },
        { sport: 'Badminton', medalType: 'silver' },
        { sport: 'Badminton Mixed', medalType: 'silver' },
        { sport: 'Athletics', medalType: 'silver' },
        { sport: 'Archery', medalType: 'silver' },
        { sport: 'Boxing', medalType: 'silver' },
        { sport: 'Wrestling', medalType: 'silver' },
        { sport: 'Taekwondo', medalType: 'silver' },
        { sport: 'Canoe Sprint', medalType: 'bronze' },
        { sport: 'Tennis', medalType: 'bronze' },
        { sport: 'BMX Freestyle', medalType: 'bronze' },
        { sport: 'Sport Climbing', medalType: 'bronze' },
        { sport: 'Breaking', medalType: 'bronze' },
        { sport: 'Hockey', medalType: 'bronze' },
        { sport: 'Judo', medalType: 'bronze' },
        { sport: 'Rhythmic Gymnastics', medalType: 'bronze' },
      ],
    },
    {
      id: 2,
      name: 'United States',
      goldMedals: 39,
      silverMedals: 41,
      bronzeMedals: 33,
      details: {
        population: 331000000,
        capital: 'Washington, D.C.',
        continent: 'North America',
        flag: '🇺🇸',
        countryCode: 'US'
      },
      sports: [
        { sport: 'Swimming', medalType: 'gold' },
        { sport: 'Athletics', medalType: 'gold' },
        { sport: 'Basketball', medalType: 'gold' },
      ],
    },
    {
      id: 3,
      name: 'Japan',
      goldMedals: 27,
      silverMedals: 14,
      bronzeMedals: 17,
      details: {
        population: 125360000,
        capital: 'Tokyo',
        continent: 'Asia',
        flag: '🇯🇵',
        countryCode: 'JP'
      },
      sports: [
        { sport: 'Judo', medalType: 'gold' },
        { sport: 'Gymnastics', medalType: 'silver' },
        { sport: 'Baseball', medalType: 'gold' },
      ],
    },
    {
      id: 4,
      name: 'United Kingdom',
      goldMedals: 22,
      silverMedals: 21,
      bronzeMedals: 22,
      details: {
        population: 67220000,
        capital: 'London',
        continent: 'Europe',
        flag: '🇬🇧',
        countryCode: 'GB'
      },
      sports: [
        { sport: 'Cycling', medalType: 'gold' },
        { sport: 'Rowing', medalType: 'gold' },
        { sport: 'Swimming', medalType: 'silver' },
      ],
    },
    {
      id: 5,
      name: 'Russia',
      goldMedals: 20,
      silverMedals: 28,
      bronzeMedals: 23,
      details: {
        population: 144100000,
        capital: 'Moscow',
        continent: 'Europe',
        flag: '🇷🇺',
        countryCode: 'RU'
      },
      sports: [
        { sport: 'Gymnastics', medalType: 'gold' },
        { sport: 'Wrestling', medalType: 'gold' },
        { sport: 'Fencing', medalType: 'silver' },
      ],
    },
    {
      id: 6,
      name: 'Australia',
      goldMedals: 17,
      silverMedals: 7,
      bronzeMedals: 22,
      details: {
        population: 25690000,
        capital: 'Canberra',
        continent: 'Oceania',
        flag: '🇦🇺',
        countryCode: 'AU'
      },
      sports: [
        { sport: 'Swimming', medalType: 'gold' },
        { sport: 'Rowing', medalType: 'gold' },
        { sport: 'Sailing', medalType: 'bronze' },
      ],
    },
    {
      id: 7,
      name: 'Netherlands',
      goldMedals: 10,
      silverMedals: 12,
      bronzeMedals: 14,
      details: {
        population: 17440000,
        capital: 'Amsterdam',
        continent: 'Europe',
        flag: '🇳🇱',
        countryCode: 'NL'
      },
      sports: [
        { sport: 'Cycling', medalType: 'gold' },
        { sport: 'Swimming', medalType: 'silver' },
        { sport: 'Sailing', medalType: 'bronze' },
      ],
    },
    {
      id: 8,
      name: 'France',
      goldMedals: 10,
      silverMedals: 12,
      bronzeMedals: 11,
      details: {
        population: 67390000,
        capital: 'Paris',
        continent: 'Europe',
        flag: '🇫🇷',
        countryCode: 'FR'
      },
      sports: [
        { sport: 'Judo', medalType: 'gold' },
        { sport: 'Fencing', medalType: 'gold' },
        { sport: 'Handball', medalType: 'gold' },
      ],
    },
    {
      id: 9,
      name: 'Germany',
      goldMedals: 10,
      silverMedals: 11,
      bronzeMedals: 16,
      details: {
        population: 83240000,
        capital: 'Berlin',
        continent: 'Europe',
        flag: '🇩🇪',
        countryCode: 'DE'
      },
      sports: [
        { sport: 'Canoeing', medalType: 'gold' },
        { sport: 'Horse Riding', medalType: 'gold' },
        { sport: 'Field Hockey', medalType: 'bronze' },
      ],
    },
    {
      id: 10,
      name: 'Italy',
      goldMedals: 10,
      silverMedals: 10,
      bronzeMedals: 20,
      details: {
        population: 60360000,
        capital: 'Rome',
        continent: 'Europe',
        flag: '🇮🇹',
        countryCode: 'IT'
      },
      sports: [
        { sport: 'Fencing', medalType: 'gold' },
        { sport: 'Cycling', medalType: 'gold' },
        { sport: 'Swimming', medalType: 'bronze' },
      ],
    },
    {
      id: 11,
      name: 'Canada',
      goldMedals: 7,
      silverMedals: 6,
      bronzeMedals: 11,
      details: {
        population: 38010000,
        capital: 'Ottawa',
        continent: 'North America',
        flag: '🇨🇦',
        countryCode: 'CA'
      },
      sports: [
        { sport: 'Swimming', medalType: 'gold' },
        { sport: 'Rowing', medalType: 'gold' },
        { sport: 'Athletics', medalType: 'bronze' },
      ],
    },
    {
      id: 12,
      name: 'Brazil',
      goldMedals: 7,
      silverMedals: 6,
      bronzeMedals: 8,
      details: {
        population: 212600000,
        capital: 'Brasília',
        continent: 'South America',
        flag: '🇧🇷',
        countryCode: 'BR'
      },
      sports: [
        { sport: 'Sailing', medalType: 'gold' },
        { sport: 'Football', medalType: 'gold' },
        { sport: 'Judo', medalType: 'bronze' },
      ],
    },
    {
      id: 13,
      name: 'New Zealand',
      goldMedals: 7,
      silverMedals: 6,
      bronzeMedals: 7,
      details: {
        population: 5090000,
        capital: 'Wellington',
        continent: 'Oceania',
        flag: '🇳🇿',
        countryCode: 'NZ'
      },
      sports: [
        { sport: 'Rowing', medalType: 'gold' },
        { sport: 'Sailing', medalType: 'gold' },
        { sport: 'Canoeing', medalType: 'bronze' },
      ],
    },
    {
      id: 14,
      name: 'Cuba',
      goldMedals: 7,
      silverMedals: 3,
      bronzeMedals: 5,
      details: {
        population: 11330000,
        capital: 'Havana',
        continent: 'North America',
        flag: '🇨🇺',
        countryCode: 'CU'
      },
      sports: [
        { sport: 'Boxing', medalType: 'gold' },
        { sport: 'Wrestling', medalType: 'gold' },
        { sport: 'Athletics', medalType: 'bronze' },
      ],
    },
    {
      id: 15,
      name: 'South Korea',
      goldMedals: 6,
      silverMedals: 4,
      bronzeMedals: 10,
      details: {
        population: 51740000,
        capital: 'Seoul',
        continent: 'Asia',
        flag: '🇰🇷',
        countryCode: 'KR'
      },
      sports: [
        { sport: 'Archery', medalType: 'gold' },
        { sport: 'Taekwondo', medalType: 'gold' },
        { sport: 'Fencing', medalType: 'bronze' },
      ],
    },
    {
      id: 16,
      name: 'Hungary',
      goldMedals: 6,
      silverMedals: 7,
      bronzeMedals: 7,
      details: {
        population: 9730000,
        capital: 'Budapest',
        continent: 'Europe',
        flag: '🇭🇺',
        countryCode: 'HU'
      },
      sports: [
        { sport: 'Canoeing', medalType: 'gold' },
        { sport: 'Fencing', medalType: 'gold' },
        { sport: 'Swimming', medalType: 'bronze' },
      ],
    },
    {
      id: 17,
      name: 'Poland',
      goldMedals: 4,
      silverMedals: 5,
      bronzeMedals: 5,
      details: {
        population: 37970000,
        capital: 'Warsaw',
        continent: 'Europe',
        flag: '🇵🇱',
        countryCode: 'PL'
      },
      sports: [
        { sport: 'Athletics', medalType: 'gold' },
        { sport: 'Rowing', medalType: 'silver' },
        { sport: 'Fencing', medalType: 'bronze' },
      ],
    },
    {
      id: 18,
      name: 'Czech Republic',
      goldMedals: 4,
      silverMedals: 4,
      bronzeMedals: 3,
      details: {
        population: 10690000,
        capital: 'Prague',
        continent: 'Europe',
        flag: '🇨🇿',
        countryCode: 'CZ'
      },
      sports: [
        { sport: 'Canoeing', medalType: 'gold' },
        { sport: 'Athletics', medalType: 'gold' },
        { sport: 'Judo', medalType: 'bronze' },
      ],
    },
    {
      id: 19,
      name: 'Kenya',
      goldMedals: 4,
      silverMedals: 4,
      bronzeMedals: 2,
      details: {
        population: 53770000,
        capital: 'Nairobi',
        continent: 'Africa',
        flag: '🇰🇪',
        countryCode: 'KE'
      },
      sports: [
        { sport: 'Athletics', medalType: 'gold' },
        { sport: 'Marathon', medalType: 'gold' },
        { sport: 'Long Distance Running', medalType: 'silver' },
      ],
    },
    {
      id: 20,
      name: 'Norway',
      goldMedals: 4,
      silverMedals: 2,
      bronzeMedals: 2,
      details: {
        population: 5380000,
        capital: 'Oslo',
        continent: 'Europe',
        flag: '🇳🇴',
        countryCode: 'NO'
      },
      sports: [
        { sport: 'Athletics', medalType: 'gold' },
        { sport: 'Swimming', medalType: 'silver' },
        { sport: 'Weightlifting', medalType: 'bronze' },
      ],
    },
    {
      id: 21,
      name: 'Sweden',
      goldMedals: 3,
      silverMedals: 6,
      bronzeMedals: 0,
      details: {
        population: 10350000,
        capital: 'Stockholm',
        continent: 'Europe',
        flag: '🇸🇪',
        countryCode: 'SE'
      },
      sports: [
        { sport: 'Wrestling', medalType: 'gold' },
        { sport: 'Athletics', medalType: 'silver' },
        { sport: 'Swimming', medalType: 'silver' },
      ],
    },
    {
      id: 22,
      name: 'Switzerland',
      goldMedals: 3,
      silverMedals: 4,
      bronzeMedals: 6,
      details: {
        population: 8570000,
        capital: 'Bern',
        continent: 'Europe',
        flag: '🇨🇭',
        countryCode: 'CH'
      },
      sports: [
        { sport: 'Tennis', medalType: 'gold' },
        { sport: 'Cycling', medalType: 'silver' },
        { sport: 'Mountain Biking', medalType: 'bronze' },
      ],
    },
    {
      id: 23,
      name: 'Denmark',
      goldMedals: 3,
      silverMedals: 4,
      bronzeMedals: 4,
      details: {
        population: 5830000,
        capital: 'Copenhagen',
        continent: 'Europe',
        flag: '🇩🇰',
        countryCode: 'DK'
      },
      sports: [
        { sport: 'Sailing', medalType: 'gold' },
        { sport: 'Cycling', medalType: 'silver' },
        { sport: 'Rowing', medalType: 'bronze' },
      ],
    },
    {
      id: 24,
      name: 'Croatia',
      goldMedals: 3,
      silverMedals: 3,
      bronzeMedals: 2,
      details: {
        population: 4050000,
        capital: 'Zagreb',
        continent: 'Europe',
        flag: '🇭🇷',
        countryCode: 'HR'
      },
      sports: [
        { sport: 'Tennis', medalType: 'gold' },
        { sport: 'Water Polo', medalType: 'silver' },
        { sport: 'Sailing', medalType: 'bronze' },
      ],
    },
    {
      id: 25,
      name: 'Iran',
      goldMedals: 3,
      silverMedals: 2,
      bronzeMedals: 2,
      details: {
        population: 84000000,
        capital: 'Tehran',
        continent: 'Asia',
        flag: '🇮🇷',
        countryCode: 'IR'
      },
      sports: [
        { sport: 'Wrestling', medalType: 'gold' },
        { sport: 'Weightlifting', medalType: 'gold' },
        { sport: 'Karate', medalType: 'silver' },
      ],
    },
    {
      id: 26,
      name: 'Serbia',
      goldMedals: 3,
      silverMedals: 1,
      bronzeMedals: 5,
      details: {
        population: 6900000,
        capital: 'Belgrade',
        continent: 'Europe',
        flag: '🇷🇸',
        countryCode: 'RS'
      },
      sports: [
        { sport: 'Water Polo', medalType: 'gold' },
        { sport: 'Wrestling', medalType: 'silver' },
        { sport: 'Basketball', medalType: 'bronze' },
      ],
    },
    {
      id: 27,
      name: 'Belgium',
      goldMedals: 3,
      silverMedals: 1,
      bronzeMedals: 3,
      details: {
        population: 11590000,
        capital: 'Brussels',
        continent: 'Europe',
        flag: '🇧🇪',
        countryCode: 'BE'
      },
      sports: [
        { sport: 'Hockey', medalType: 'gold' },
        { sport: 'Gymnastics', medalType: 'silver' },
        { sport: 'Cycling', medalType: 'bronze' },
      ],
    },
    {
      id: 28,
      name: 'Bulgaria',
      goldMedals: 3,
      silverMedals: 1,
      bronzeMedals: 2,
      details: {
        population: 6900000,
        capital: 'Sofia',
        continent: 'Europe',
        flag: '🇧🇬',
        countryCode: 'BG'
      },
      sports: [
        { sport: 'Wrestling', medalType: 'gold' },
        { sport: 'Boxing', medalType: 'silver' },
        { sport: 'Karate', medalType: 'bronze' },
      ],
    },
    {
      id: 29,
      name: 'Spain',
      goldMedals: 3,
      silverMedals: 8,
      bronzeMedals: 6,
      details: {
        population: 47350000,
        capital: 'Madrid',
        continent: 'Europe',
        flag: '🇪🇸',
        countryCode: 'ES'
      },
      sports: [
        { sport: 'Karate', medalType: 'gold' },
        { sport: 'Basketball', medalType: 'silver' },
        { sport: 'Water Polo', medalType: 'bronze' },
      ],
    },
    {
      id: 30,
      name: 'Slovenia',
      goldMedals: 3,
      silverMedals: 1,
      bronzeMedals: 1,
      details: {
        population: 2100000,
        capital: 'Ljubljana',
        continent: 'Europe',
        flag: '🇸🇮',
        countryCode: 'SI'
      },
      sports: [
        { sport: 'Climbing', medalType: 'gold' },
        { sport: 'Cycling', medalType: 'silver' },
        { sport: 'Judo', medalType: 'bronze' },
      ],
    },
    {
      id: 31,
      name: 'Romania',
      goldMedals: 1,
      silverMedals: 3,
      bronzeMedals: 0,
      details: {
        population: 19240000,
        capital: 'Bucharest',
        continent: 'Europe',
        flag: '🇷🇴',
        countryCode: 'RO'
      },
      sports: [
        { sport: 'Rowing', medalType: 'gold' },
        { sport: 'Fencing', medalType: 'silver' },
        { sport: 'Swimming', medalType: 'silver' },
      ],
    },
    {
      id: 32,
      name: 'Venezuela',
      goldMedals: 1,
      silverMedals: 3,
      bronzeMedals: 0,
      details: {
        population: 28440000,
        capital: 'Caracas',
        continent: 'South America',
        flag: '🇻🇪',
        countryCode: 'VE'
      },
      sports: [
        { sport: 'Athletics', medalType: 'gold' },
        { sport: 'Boxing', medalType: 'silver' },
        { sport: 'Wrestling', medalType: 'silver' },
      ],
    },
    {
      id: 33,
      name: 'India',
      goldMedals: 1,
      silverMedals: 2,
      bronzeMedals: 4,
      details: {
        population: 1380000000,
        capital: 'New Delhi',
        continent: 'Asia',
        flag: '🇮🇳',
        countryCode: 'IN'
      },
      sports: [
        { sport: 'Athletics', medalType: 'gold' },
        { sport: 'Wrestling', medalType: 'silver' },
        { sport: 'Hockey', medalType: 'bronze' },
      ],
    },
    {
      id: 34,
      name: 'Hong Kong, China',
      goldMedals: 1,
      silverMedals: 2,
      bronzeMedals: 3,
      details: {
        population: 7500000,
        capital: 'Hong Kong',
        continent: 'Asia',
        flag: '🇭🇰',
        countryCode: 'HK'
      },
      sports: [
        { sport: 'Fencing', medalType: 'gold' },
        { sport: 'Swimming', medalType: 'silver' },
        { sport: 'Table Tennis', medalType: 'bronze' },
      ],
    },
    {
      id: 35,
      name: 'Slovakia',
      goldMedals: 1,
      silverMedals: 2,
      bronzeMedals: 1,
      details: {
        population: 5460000,
        capital: 'Bratislava',
        continent: 'Europe',
        flag: '🇸🇰',
        countryCode: 'SK'
      },
      sports: [
        { sport: 'Shooting', medalType: 'gold' },
        { sport: 'Canoeing', medalType: 'silver' },
        { sport: 'Athletics', medalType: 'bronze' },
      ],
    },
    {
      id: 36,
      name: 'South Africa',
      goldMedals: 1,
      silverMedals: 2,
      bronzeMedals: 0,
      details: {
        population: 59310000,
        capital: 'Pretoria',
        continent: 'Africa',
        flag: '🇿🇦',
        countryCode: 'ZA'
      },
      sports: [
        { sport: 'Swimming', medalType: 'gold' },
        { sport: 'Rugby Sevens', medalType: 'silver' },
        { sport: 'Athletics', medalType: 'silver' },
      ],
    },
    {
      id: 37,
      name: 'Austria',
      goldMedals: 1,
      silverMedals: 1,
      bronzeMedals: 5,
      details: {
        population: 9006000,
        capital: 'Vienna',
        continent: 'Europe',
        flag: '🇦🇹',
        countryCode: 'AT'
      },
      sports: [
        { sport: 'Cycling', medalType: 'gold' },
        { sport: 'Climbing', medalType: 'silver' },
        { sport: 'Judo', medalType: 'bronze' },
      ],
    },
    {
      id: 38,
      name: 'Egypt',
      goldMedals: 1,
      silverMedals: 1,
      bronzeMedals: 4,
      details: {
        population: 102300000,
        capital: 'Cairo',
        continent: 'Africa',
        flag: '🇪🇬',
        countryCode: 'EG'
      },
      sports: [
        { sport: 'Wrestling', medalType: 'gold' },
        { sport: 'Karate', medalType: 'silver' },
        { sport: 'Taekwondo', medalType: 'bronze' },
      ],
    },
    {
      id: 39,
      name: 'Indonesia',
      goldMedals: 1,
      silverMedals: 1,
      bronzeMedals: 3,
      details: {
        population: 273500000,
        capital: 'Jakarta',
        continent: 'Asia',
        flag: '🇮🇩',
        countryCode: 'ID'
      },
      sports: [
        { sport: 'Badminton', medalType: 'gold' },
        { sport: 'Weightlifting', medalType: 'silver' },
        { sport: 'Boxing', medalType: 'bronze' },
      ],
    },
    {
      id: 40,
      name: 'Ethiopia',
      goldMedals: 1,
      silverMedals: 1,
      bronzeMedals: 2,
      details: {
        population: 114960000,
        capital: 'Addis Ababa',
        continent: 'Africa',
        flag: '🇪🇹',
        countryCode: 'ET'
      },
      sports: [
        { sport: 'Athletics', medalType: 'gold' },
        { sport: 'Marathon', medalType: 'silver' },
        { sport: 'Long Distance Running', medalType: 'bronze' },
      ],
    }
  ]);

  const comments = ref<Comment[]>([]);
  const itemsPerPage = ref(10);

  const $reset = () => {
    countries.value = [
      {
        id: 1,
        name: 'China',
        goldMedals: 38,
        silverMedals: 32,
        bronzeMedals: 18,
        details: {
          population: 1400000000,
          capital: 'Beijing',
          continent: 'Asia',
          flag: '🇨🇳',
          countryCode: 'CN'
        },
        sports: [
          { sport: 'Table Tennis', medalType: 'gold' },
          { sport: 'Table Tennis Team', medalType: 'gold' },
          { sport: 'Diving', medalType: 'gold' },
          { sport: 'Diving Team', medalType: 'gold' },
          { sport: 'Weightlifting', medalType: 'gold' },
          { sport: 'Weightlifting Women', medalType: 'gold' },
          { sport: 'Gymnastics', medalType: 'gold' },
          { sport: 'Artistic Gymnastics', medalType: 'gold' },
          { sport: 'Trampoline', medalType: 'gold' },
          { sport: 'Shooting', medalType: 'gold' },
          { sport: 'Swimming', medalType: 'gold' },
          { sport: 'Synchronized Swimming', medalType: 'silver' },
          { sport: 'Badminton', medalType: 'silver' },
          { sport: 'Badminton Mixed', medalType: 'silver' },
          { sport: 'Athletics', medalType: 'silver' },
          { sport: 'Archery', medalType: 'silver' },
          { sport: 'Boxing', medalType: 'silver' },
          { sport: 'Wrestling', medalType: 'silver' },
          { sport: 'Taekwondo', medalType: 'silver' },
          { sport: 'Canoe Sprint', medalType: 'bronze' },
          { sport: 'Tennis', medalType: 'bronze' },
          { sport: 'BMX Freestyle', medalType: 'bronze' },
          { sport: 'Sport Climbing', medalType: 'bronze' },
          { sport: 'Breaking', medalType: 'bronze' },
          { sport: 'Hockey', medalType: 'bronze' },
          { sport: 'Judo', medalType: 'bronze' },
          { sport: 'Rhythmic Gymnastics', medalType: 'bronze' },
        ],
      },
      {
        id: 2,
        name: 'United States',
        goldMedals: 39,
        silverMedals: 41,
        bronzeMedals: 33,
        details: {
          population: 331000000,
          capital: 'Washington, D.C.',
          continent: 'North America',
          flag: '🇺🇸',
          countryCode: 'US'
        },
        sports: [
          { sport: 'Swimming', medalType: 'gold' },
          { sport: 'Athletics', medalType: 'gold' },
          { sport: 'Basketball', medalType: 'gold' },
        ],
      },
      {
        id: 3,
        name: 'Japan',
        goldMedals: 27,
        silverMedals: 14,
        bronzeMedals: 17,
        details: {
          population: 125360000,
          capital: 'Tokyo',
          continent: 'Asia',
          flag: '🇯🇵',
          countryCode: 'JP'
        },
        sports: [
          { sport: 'Judo', medalType: 'gold' },
          { sport: 'Gymnastics', medalType: 'silver' },
          { sport: 'Baseball', medalType: 'gold' },
        ],
      },
      {
        id: 4,
        name: 'United Kingdom',
        goldMedals: 22,
        silverMedals: 21,
        bronzeMedals: 22,
        details: {
          population: 67220000,
          capital: 'London',
          continent: 'Europe',
          flag: '🇬🇧',
          countryCode: 'GB'
        },
        sports: [
          { sport: 'Cycling', medalType: 'gold' },
          { sport: 'Rowing', medalType: 'gold' },
          { sport: 'Swimming', medalType: 'silver' },
        ],
      },
      {
        id: 5,
        name: 'Russia',
        goldMedals: 20,
        silverMedals: 28,
        bronzeMedals: 23,
        details: {
          population: 144100000,
          capital: 'Moscow',
          continent: 'Europe',
          flag: '🇷🇺',
          countryCode: 'RU'
        },
        sports: [
          { sport: 'Gymnastics', medalType: 'gold' },
          { sport: 'Wrestling', medalType: 'gold' },
          { sport: 'Fencing', medalType: 'silver' },
        ],
      },
      {
        id: 6,
        name: 'Australia',
        goldMedals: 17,
        silverMedals: 7,
        bronzeMedals: 22,
        details: {
          population: 25690000,
          capital: 'Canberra',
          continent: 'Oceania',
          flag: '🇦🇺',
          countryCode: 'AU'
        },
        sports: [
          { sport: 'Swimming', medalType: 'gold' },
          { sport: 'Rowing', medalType: 'gold' },
          { sport: 'Sailing', medalType: 'bronze' },
        ],
      },
      {
        id: 7,
        name: 'Netherlands',
        goldMedals: 10,
        silverMedals: 12,
        bronzeMedals: 14,
        details: {
          population: 17440000,
          capital: 'Amsterdam',
          continent: 'Europe',
          flag: '🇳🇱',
          countryCode: 'NL'
        },
        sports: [
          { sport: 'Cycling', medalType: 'gold' },
          { sport: 'Swimming', medalType: 'silver' },
          { sport: 'Sailing', medalType: 'bronze' },
        ],
      },
      {
        id: 8,
        name: 'France',
        goldMedals: 10,
        silverMedals: 12,
        bronzeMedals: 11,
        details: {
          population: 67390000,
          capital: 'Paris',
          continent: 'Europe',
          flag: '🇫🇷',
          countryCode: 'FR'
        },
        sports: [
          { sport: 'Judo', medalType: 'gold' },
          { sport: 'Fencing', medalType: 'gold' },
          { sport: 'Handball', medalType: 'gold' },
        ],
      },
      {
        id: 9,
        name: 'Germany',
        goldMedals: 10,
        silverMedals: 11,
        bronzeMedals: 16,
        details: {
          population: 83240000,
          capital: 'Berlin',
          continent: 'Europe',
          flag: '🇩🇪',
          countryCode: 'DE'
        },
        sports: [
          { sport: 'Canoeing', medalType: 'gold' },
          { sport: 'Horse Riding', medalType: 'gold' },
          { sport: 'Field Hockey', medalType: 'bronze' },
        ],
      },
      {
        id: 10,
        name: 'Italy',
        goldMedals: 10,
        silverMedals: 10,
        bronzeMedals: 20,
        details: {
          population: 60360000,
          capital: 'Rome',
          continent: 'Europe',
          flag: '🇮🇹',
          countryCode: 'IT'
        },
        sports: [
          { sport: 'Fencing', medalType: 'gold' },
          { sport: 'Cycling', medalType: 'gold' },
          { sport: 'Swimming', medalType: 'bronze' },
        ],
      },
      {
        id: 11,
        name: 'Canada',
        goldMedals: 7,
        silverMedals: 6,
        bronzeMedals: 11,
        details: {
          population: 38010000,
          capital: 'Ottawa',
          continent: 'North America',
          flag: '🇨🇦',
          countryCode: 'CA'
        },
        sports: [
          { sport: 'Swimming', medalType: 'gold' },
          { sport: 'Rowing', medalType: 'gold' },
          { sport: 'Athletics', medalType: 'bronze' },
        ],
      },
      {
        id: 12,
        name: 'Brazil',
        goldMedals: 7,
        silverMedals: 6,
        bronzeMedals: 8,
        details: {
          population: 212600000,
          capital: 'Brasília',
          continent: 'South America',
          flag: '🇧🇷',
          countryCode: 'BR'
        },
        sports: [
          { sport: 'Sailing', medalType: 'gold' },
          { sport: 'Football', medalType: 'gold' },
          { sport: 'Judo', medalType: 'bronze' },
        ],
      },
      {
        id: 13,
        name: 'New Zealand',
        goldMedals: 7,
        silverMedals: 6,
        bronzeMedals: 7,
        details: {
          population: 5090000,
          capital: 'Wellington',
          continent: 'Oceania',
          flag: '🇳🇿',
          countryCode: 'NZ'
        },
        sports: [
          { sport: 'Rowing', medalType: 'gold' },
          { sport: 'Sailing', medalType: 'gold' },
          { sport: 'Canoeing', medalType: 'bronze' },
        ],
      },
      {
        id: 14,
        name: 'Cuba',
        goldMedals: 7,
        silverMedals: 3,
        bronzeMedals: 5,
        details: {
          population: 11330000,
          capital: 'Havana',
          continent: 'North America',
          flag: '🇨🇺',
          countryCode: 'CU'
        },
        sports: [
          { sport: 'Boxing', medalType: 'gold' },
          { sport: 'Wrestling', medalType: 'gold' },
          { sport: 'Athletics', medalType: 'bronze' },
        ],
      },
      {
        id: 15,
        name: 'South Korea',
        goldMedals: 6,
        silverMedals: 4,
        bronzeMedals: 10,
        details: {
          population: 51740000,
          capital: 'Seoul',
          continent: 'Asia',
          flag: '🇰🇷',
          countryCode: 'KR'
        },
        sports: [
          { sport: 'Archery', medalType: 'gold' },
          { sport: 'Taekwondo', medalType: 'gold' },
          { sport: 'Fencing', medalType: 'bronze' },
        ],
      },
      {
        id: 16,
        name: 'Hungary',
        goldMedals: 6,
        silverMedals: 7,
        bronzeMedals: 7,
        details: {
          population: 9730000,
          capital: 'Budapest',
          continent: 'Europe',
          flag: '🇭🇺',
          countryCode: 'HU'
        },
        sports: [
          { sport: 'Canoeing', medalType: 'gold' },
          { sport: 'Fencing', medalType: 'gold' },
          { sport: 'Swimming', medalType: 'bronze' },
        ],
      },
      {
        id: 17,
        name: 'Poland',
        goldMedals: 4,
        silverMedals: 5,
        bronzeMedals: 5,
        details: {
          population: 37970000,
          capital: 'Warsaw',
          continent: 'Europe',
          flag: '🇵🇱',
          countryCode: 'PL'
        },
        sports: [
          { sport: 'Athletics', medalType: 'gold' },
          { sport: 'Rowing', medalType: 'silver' },
          { sport: 'Fencing', medalType: 'bronze' },
        ],
      },
      {
        id: 18,
        name: 'Czech Republic',
        goldMedals: 4,
        silverMedals: 4,
        bronzeMedals: 3,
        details: {
          population: 10690000,
          capital: 'Prague',
          continent: 'Europe',
          flag: '🇨🇿',
          countryCode: 'CZ'
        },
        sports: [
          { sport: 'Canoeing', medalType: 'gold' },
          { sport: 'Athletics', medalType: 'gold' },
          { sport: 'Judo', medalType: 'bronze' },
        ],
      },
      {
        id: 19,
        name: 'Kenya',
        goldMedals: 4,
        silverMedals: 4,
        bronzeMedals: 2,
        details: {
          population: 53770000,
          capital: 'Nairobi',
          continent: 'Africa',
          flag: '🇰🇪',
          countryCode: 'KE'
        },
        sports: [
          { sport: 'Athletics', medalType: 'gold' },
          { sport: 'Marathon', medalType: 'gold' },
          { sport: 'Long Distance Running', medalType: 'silver' },
        ],
      },
      {
        id: 20,
        name: 'Norway',
        goldMedals: 4,
        silverMedals: 2,
        bronzeMedals: 2,
        details: {
          population: 5380000,
          capital: 'Oslo',
          continent: 'Europe',
          flag: '🇳🇴',
          countryCode: 'NO'
        },
        sports: [
          { sport: 'Athletics', medalType: 'gold' },
          { sport: 'Swimming', medalType: 'silver' },
          { sport: 'Weightlifting', medalType: 'bronze' },
        ],
      },
      {
        id: 21,
        name: 'Sweden',
        goldMedals: 3,
        silverMedals: 6,
        bronzeMedals: 0,
        details: {
          population: 10350000,
          capital: 'Stockholm',
          continent: 'Europe',
          flag: '🇸🇪',
          countryCode: 'SE'
        },
        sports: [
          { sport: 'Wrestling', medalType: 'gold' },
          { sport: 'Athletics', medalType: 'silver' },
          { sport: 'Swimming', medalType: 'silver' },
        ],
      },
      {
        id: 22,
        name: 'Switzerland',
        goldMedals: 3,
        silverMedals: 4,
        bronzeMedals: 6,
        details: {
          population: 8570000,
          capital: 'Bern',
          continent: 'Europe',
          flag: '🇨🇭',
          countryCode: 'CH'
        },
        sports: [
          { sport: 'Tennis', medalType: 'gold' },
          { sport: 'Cycling', medalType: 'silver' },
          { sport: 'Mountain Biking', medalType: 'bronze' },
        ],
      },
      {
        id: 23,
        name: 'Denmark',
        goldMedals: 3,
        silverMedals: 4,
        bronzeMedals: 4,
        details: {
          population: 5830000,
          capital: 'Copenhagen',
          continent: 'Europe',
          flag: '🇩🇰',
          countryCode: 'DK'
        },
        sports: [
          { sport: 'Sailing', medalType: 'gold' },
          { sport: 'Cycling', medalType: 'silver' },
          { sport: 'Rowing', medalType: 'bronze' },
        ],
      },
      {
        id: 24,
        name: 'Croatia',
        goldMedals: 3,
        silverMedals: 3,
        bronzeMedals: 2,
        details: {
          population: 4050000,
          capital: 'Zagreb',
          continent: 'Europe',
          flag: '🇭🇷',
          countryCode: 'HR'
        },
        sports: [
          { sport: 'Tennis', medalType: 'gold' },
          { sport: 'Water Polo', medalType: 'silver' },
          { sport: 'Sailing', medalType: 'bronze' },
        ],
      },
      {
        id: 25,
        name: 'Iran',
        goldMedals: 3,
        silverMedals: 2,
        bronzeMedals: 2,
        details: {
          population: 84000000,
          capital: 'Tehran',
          continent: 'Asia',
          flag: '🇮🇷',
          countryCode: 'IR'
        },
        sports: [
          { sport: 'Wrestling', medalType: 'gold' },
          { sport: 'Weightlifting', medalType: 'gold' },
          { sport: 'Karate', medalType: 'silver' },
        ],
      },
      {
        id: 26,
        name: 'Serbia',
        goldMedals: 3,
        silverMedals: 1,
        bronzeMedals: 5,
        details: {
          population: 6900000,
          capital: 'Belgrade',
          continent: 'Europe',
          flag: '🇷🇸',
          countryCode: 'RS'
        },
        sports: [
          { sport: 'Water Polo', medalType: 'gold' },
          { sport: 'Wrestling', medalType: 'silver' },
          { sport: 'Basketball', medalType: 'bronze' },
        ],
      },
      {
        id: 27,
        name: 'Belgium',
        goldMedals: 3,
        silverMedals: 1,
        bronzeMedals: 3,
        details: {
          population: 11590000,
          capital: 'Brussels',
          continent: 'Europe',
          flag: '🇧🇪',
          countryCode: 'BE'
        },
        sports: [
          { sport: 'Hockey', medalType: 'gold' },
          { sport: 'Gymnastics', medalType: 'silver' },
          { sport: 'Cycling', medalType: 'bronze' },
        ],
      },
      {
        id: 28,
        name: 'Bulgaria',
        goldMedals: 3,
        silverMedals: 1,
        bronzeMedals: 2,
        details: {
          population: 6900000,
          capital: 'Sofia',
          continent: 'Europe',
          flag: '🇧🇬',
          countryCode: 'BG'
        },
        sports: [
          { sport: 'Wrestling', medalType: 'gold' },
          { sport: 'Boxing', medalType: 'silver' },
          { sport: 'Karate', medalType: 'bronze' },
        ],
      },
      {
        id: 29,
        name: 'Spain',
        goldMedals: 3,
        silverMedals: 8,
        bronzeMedals: 6,
        details: {
          population: 47350000,
          capital: 'Madrid',
          continent: 'Europe',
          flag: '🇪🇸',
          countryCode: 'ES'
        },
        sports: [
          { sport: 'Karate', medalType: 'gold' },
          { sport: 'Basketball', medalType: 'silver' },
          { sport: 'Water Polo', medalType: 'bronze' },
        ],
      },
      {
        id: 30,
        name: 'Slovenia',
        goldMedals: 3,
        silverMedals: 1,
        bronzeMedals: 1,
        details: {
          population: 2100000,
          capital: 'Ljubljana',
          continent: 'Europe',
          flag: '🇸🇮',
          countryCode: 'SI'
        },
        sports: [
          { sport: 'Climbing', medalType: 'gold' },
          { sport: 'Cycling', medalType: 'silver' },
          { sport: 'Judo', medalType: 'bronze' },
        ],
      },
      {
        id: 31,
        name: 'Romania',
        goldMedals: 1,
        silverMedals: 3,
        bronzeMedals: 0,
        details: {
          population: 19240000,
          capital: 'Bucharest',
          continent: 'Europe',
          flag: '🇷🇴',
          countryCode: 'RO'
        },
        sports: [
          { sport: 'Rowing', medalType: 'gold' },
          { sport: 'Fencing', medalType: 'silver' },
          { sport: 'Swimming', medalType: 'silver' },
        ],
      },
      {
        id: 32,
        name: 'Venezuela',
        goldMedals: 1,
        silverMedals: 3,
        bronzeMedals: 0,
        details: {
          population: 28440000,
          capital: 'Caracas',
          continent: 'South America',
          flag: '🇻🇪',
          countryCode: 'VE'
        },
        sports: [
          { sport: 'Athletics', medalType: 'gold' },
          { sport: 'Boxing', medalType: 'silver' },
          { sport: 'Wrestling', medalType: 'silver' },
        ],
      },
      {
        id: 33,
        name: 'India',
        goldMedals: 1,
        silverMedals: 2,
        bronzeMedals: 4,
        details: {
          population: 1380000000,
          capital: 'New Delhi',
          continent: 'Asia',
          flag: '🇮🇳',
          countryCode: 'IN'
        },
        sports: [
          { sport: 'Athletics', medalType: 'gold' },
          { sport: 'Wrestling', medalType: 'silver' },
          { sport: 'Hockey', medalType: 'bronze' },
        ],
      },
      {
        id: 34,
        name: 'Hong Kong, China',
        goldMedals: 1,
        silverMedals: 2,
        bronzeMedals: 3,
        details: {
          population: 7500000,
          capital: 'Hong Kong',
          continent: 'Asia',
          flag: '🇭🇰',
          countryCode: 'HK'
        },
        sports: [
          { sport: 'Fencing', medalType: 'gold' },
          { sport: 'Swimming', medalType: 'silver' },
          { sport: 'Table Tennis', medalType: 'bronze' },
        ],
      },
      {
        id: 35,
        name: 'Slovakia',
        goldMedals: 1,
        silverMedals: 2,
        bronzeMedals: 1,
        details: {
          population: 5460000,
          capital: 'Bratislava',
          continent: 'Europe',
          flag: '🇸🇰',
          countryCode: 'SK'
        },
        sports: [
          { sport: 'Shooting', medalType: 'gold' },
          { sport: 'Canoeing', medalType: 'silver' },
          { sport: 'Athletics', medalType: 'bronze' },
        ],
      },
      {
        id: 36,
        name: 'South Africa',
        goldMedals: 1,
        silverMedals: 2,
        bronzeMedals: 0,
        details: {
          population: 59310000,
          capital: 'Pretoria',
          continent: 'Africa',
          flag: '🇿🇦',
          countryCode: 'ZA'
        },
        sports: [
          { sport: 'Swimming', medalType: 'gold' },
          { sport: 'Rugby Sevens', medalType: 'silver' },
          { sport: 'Athletics', medalType: 'silver' },
        ],
      },
      {
        id: 37,
        name: 'Austria',
        goldMedals: 1,
        silverMedals: 1,
        bronzeMedals: 5,
        details: {
          population: 9006000,
          capital: 'Vienna',
          continent: 'Europe',
          flag: '🇦🇹',
          countryCode: 'AT'
        },
        sports: [
          { sport: 'Cycling', medalType: 'gold' },
          { sport: 'Climbing', medalType: 'silver' },
          { sport: 'Judo', medalType: 'bronze' },
        ],
      },
      {
        id: 38,
        name: 'Egypt',
        goldMedals: 1,
        silverMedals: 1,
        bronzeMedals: 4,
        details: {
          population: 102300000,
          capital: 'Cairo',
          continent: 'Africa',
          flag: '🇪🇬',
          countryCode: 'EG'
        },
        sports: [
          { sport: 'Wrestling', medalType: 'gold' },
          { sport: 'Karate', medalType: 'silver' },
          { sport: 'Taekwondo', medalType: 'bronze' },
        ],
      },
      {
        id: 39,
        name: 'Indonesia',
        goldMedals: 1,
        silverMedals: 1,
        bronzeMedals: 3,
        details: {
          population: 273500000,
          capital: 'Jakarta',
          continent: 'Asia',
          flag: '🇮🇩',
          countryCode: 'ID'
        },
        sports: [
          { sport: 'Badminton', medalType: 'gold' },
          { sport: 'Weightlifting', medalType: 'silver' },
          { sport: 'Boxing', medalType: 'bronze' },
        ],
      },
      {
        id: 40,
        name: 'Ethiopia',
        goldMedals: 1,
        silverMedals: 1,
        bronzeMedals: 2,
        details: {
          population: 114960000,
          capital: 'Addis Ababa',
          continent: 'Africa',
          flag: '🇪🇹',
          countryCode: 'ET'
        },
        sports: [
          { sport: 'Athletics', medalType: 'gold' },
          { sport: 'Marathon', medalType: 'silver' },
          { sport: 'Long Distance Running', medalType: 'bronze' },
        ],
      }
    ];
    comments.value = [];
    itemsPerPage.value = 10;
  };

  const addComment = (countryId: number, text: string) => {
    comments.value.push({
      id: Date.now(),
      countryId,
      text,
      timestamp: new Date(),
    });
  };

  return {
    countries,
    comments,
    itemsPerPage,
    addComment,
    $reset,
  };
}); 