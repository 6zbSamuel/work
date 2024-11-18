export const getCountryCode = (countryName: string): string => {
  const countryMap: { [key: string]: string } = {
    'China': 'CN',
    'United States': 'US',
    'Japan': 'JP',
    'United Kingdom': 'GB',
    'Russia': 'RU',
    'Australia': 'AU',
    'Netherlands': 'NL',
    'France': 'FR',
    'Germany': 'DE',
    'Italy': 'IT',
    'Canada': 'CA',
    'Brazil': 'BR',
    'New Zealand': 'NZ',
    'Cuba': 'CU',
    'South Korea': 'KR',
    'Hungary': 'HU',
    'Poland': 'PL',
    'Czech Republic': 'CZ',
    'Kenya': 'KE',
    'Norway': 'NO'
  };
  return countryMap[countryName] || '';
}; 