const mockWeatherData = {
  'san francisco': { temp: 18, condition: 'clear skies', city: 'San Francisco' },
  'new york': { temp: 5, condition: 'cloudy with snow', city: 'New York' },
  'london': { temp: 8, condition: 'rainy', city: 'London' },
  'tokyo': { temp: 12, condition: 'partly cloudy', city: 'Tokyo' },
  'sydney': { temp: 25, condition: 'sunny', city: 'Sydney' },
  'paris': { temp: 6, condition: 'overcast', city: 'Paris' },
  'dubai': { temp: 32, condition: 'sunny', city: 'Dubai' },
  'mumbai': { temp: 28, condition: 'humid with clouds', city: 'Mumbai' }
};

export const getWeather = async (city) => {
  const normalizedCity = city.toLowerCase().trim();
  const weather = mockWeatherData[normalizedCity];
  
  if (!weather) {
    return `Weather data for ${city} is not available.`;
  }
  
  return `The weather in ${weather.city} is ${weather.temp}°C with ${weather.condition}.`;
};
