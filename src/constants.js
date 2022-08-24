const FILMS_COUNT = 5;
const MOST_COMMENTED_FILMS_COUNT = 2;
const TOP_RATED_FILMS_COUNT = 2;

const CommentLength = {
  MIN: 0,
  MAX: 140,
};

const FilmMockData = {
  TITLES: [
    '12 Angry Men',
    'The Dark Knight',
    'The Lord of the Rings: The Fellowship of the Ring',
    'Star Wars: Episode V - The Empire Strikes Back',
  ],

  POSTERS: [
    'images/posters/santa-claus-conquers-the-martians.jpg',
    'images/posters/made-for-each-other.png',
    'images/posters/popeye-meets-sinbad.png',
    'images/posters/sagebrush-trail.jpg',
    'images/posters/the-dance-of-life.jpg',
    'images/posters/the-great-flamarion.jpg',
    'images/posters/the-man-with-the-golden-arm.jpg',
  ],

  AgeRating: {
    MIN: 0,
    MAX: 18,
  },

  DIRECTORS: [
    'Irvin Kershner',
    'Peter Jackson',
    'Jonathan Demme',
    'Roberto Benigni',
    'Christopher Nolan',
  ],

  WRITERS: [
    ['Clint Eastwood', 'Eli WallachLee', 'Van Cleef'],
    ['Jonathan Nolan', 'Christopher Nolan'],
    ['Chuck Palahniuk', 'Jim Uhls'],
    ['Luciano Vincenzoni', 'Sergio Leone', 'Agenore Incrocci'],
  ],

  ACTORS: [
    ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'],
    ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen'],
    ['Jack Nicholson', 'Louise Fletcher', 'Michael Berryman'],
  ],

  DATES: [
    '1964-01-19T10:14:30.576Z',
    '2000-11-09T12:03:00.526Z',
    '2021-12-29T22:04:01.573Z',
    '1903-05-01T23:54:59.776Z',
    '1998-04-18T01:59:11.556Z',
  ],

  COUNTRIES: ['Russia', 'USA', 'Germany', 'France'],

  GENRES: [['Comedy'], ['Drama'], ['Mystery', 'Horror']],

  Runtime: {
    MIN: 30,
    MAX: 200,
  },

  DESCRIPTIONS: [
    'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.',
  ],
};

export {
  FILMS_COUNT,
  MOST_COMMENTED_FILMS_COUNT,
  TOP_RATED_FILMS_COUNT,
  FilmMockData,
  CommentLength,
};
