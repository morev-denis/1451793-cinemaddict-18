import { getRandomInteger } from '../utils.js';

const generateTotalRating = () => (Math.random() * 10).toFixed(1);

const generateGenre = () => {
  const typeOfGenres = [['Comedy'], ['Drama'], ['Mystery', 'Horror']];
  const randomIndex = getRandomInteger(0, typeOfGenres.length - 1);

  return typeOfGenres[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.',
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generatePoster = () => {
  const posters = [
    'images/posters/santa-claus-conquers-the-martians.jpg',
    'images/posters/made-for-each-other.png',
    'images/posters/popeye-meets-sinbad.png',
    'images/posters/sagebrush-trail.jpg',
    'images/posters/the-dance-of-life.jpg',
    'images/posters/the-great-flamarion.jpg',
    'images/posters/the-man-with-the-golden-arm.jpg',
  ];
  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateTitle = () => {
  const titles = [
    '12 Angry Men',
    'The Dark Knight',
    'The Lord of the Rings: The Fellowship of the Ring',
    'Star Wars: Episode V - The Empire Strikes Back',
  ];
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateReleaseCountry = () => {
  const countries = ['Russia', 'USA', 'Germany', 'France'];
  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateDate = () => {
  const dates = [
    '1964-01-19T10:14:30.576Z',
    '2000-11-09T12:03:00.526Z',
    '2021-12-29T22:04:01.573Z',
    '1903-05-01T23:54:59.776Z',
    '1998-04-18T01:59:11.556Z',
  ];
  const randomIndex = getRandomInteger(0, dates.length - 1);

  return dates[randomIndex];
};

const generateDirector = () => {
  const directors = [
    'Irvin Kershner',
    'Peter Jackson',
    'Jonathan Demme',
    'Roberto Benigni',
    'Christopher Nolan',
  ];
  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriters = () => {
  const writers = [
    ['Clint Eastwood', 'Eli WallachLee', 'Van Cleef'],
    ['Jonathan Nolan', 'Christopher Nolan'],
    ['Chuck Palahniuk', 'Jim Uhls'],
    ['Luciano Vincenzoni', 'Sergio Leone', 'Agenore Incrocci'],
  ];
  const randomIndex = getRandomInteger(0, writers.length - 1);

  return writers[randomIndex];
};

const generateActors = () => {
  const actors = [
    ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'],
    ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen'],
    ['Jack Nicholson', 'Louise Fletcher', 'Michael Berryman'],
  ];
  const randomIndex = getRandomInteger(0, actors.length - 1);

  return actors[randomIndex];
};

export const generateFilm = () => ({
  id: '0',
  comments: ['1', '2'],
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: generateTitle(),
    totalRating: generateTotalRating(),
    poster: generatePoster(),
    ageRating: getRandomInteger(0, 18),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: {
      date: generateDate(),
      releaseCountry: generateReleaseCountry(),
    },
    runtime: getRandomInteger(20, 200),
    genre: generateGenre(),
    description: generateDescription(),
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false,
  },
});
