import { getRandomInteger, getRandomItem } from '../utils/common.js';

import { FilmMockData } from '../constants.js';

export const generateFilm = () => ({
  title: getRandomItem(FilmMockData.TITLES),
  alternativeTitle: getRandomItem(FilmMockData.TITLES),
  totalRating: (getRandomInteger(2, 10) - Math.random()).toFixed(1),
  poster: getRandomItem(FilmMockData.POSTERS),
  ageRating: getRandomInteger(FilmMockData.AgeRating.MIN, FilmMockData.AgeRating.MAX),
  director: getRandomItem(FilmMockData.DIRECTORS),
  writers: getRandomItem(FilmMockData.WRITERS),
  actors: getRandomItem(FilmMockData.ACTORS),
  release: {
    date: getRandomItem(FilmMockData.DATES),
    releaseCountry: getRandomItem(FilmMockData.COUNTRIES),
  },
  runtime: getRandomInteger(FilmMockData.Runtime.MIN, FilmMockData.Runtime.MAX),
  genre: getRandomItem(FilmMockData.GENRES),
  description: getRandomItem(FilmMockData.DESCRIPTIONS),
});
