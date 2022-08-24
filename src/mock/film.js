import { getRandomInteger } from '../utils.js';

import { FilmMockData } from '../constants.js';
import { getRandomItem } from '../utils.js';

export const generateFilm = () => ({
  id: '0',
  comments: ['1', '2'],
  filmInfo: {
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
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false,
  },
});
