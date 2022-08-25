const FILMS_COUNT = 5;
const MOST_COMMENTED_FILMS_COUNT = 2;
const TOP_RATED_FILMS_COUNT = 2;
const MAX_COMMENTS_ON_FILM = 5;

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

const CommentMockData = {
  AUTHORS: ['Doctor Eggman', 'Hello Kitty', 'Nanako Dojima', 'Relm Arrowny'],

  COMMENTS: [
    'The movie started out pretty innocently, and for the first 20 minutes, I was wondering where the movie was going.',
    'I have only ever seen this film once, I only ever want to see this film once and I will only ever need to see this film once.',
    'Ive seen this film one time in 1994. This is one of the best movies ever made, but many scenes of the film are so brutal, that Im afraid to see this film for a second time.',
    'This is probably the most important movie of director Steven Spielbergs career.',
  ],
  DATES: [
    '1999-01-19T10:14:30.576Z',
    '2020-11-09T12:03:00.526Z',
    '2021-12-29T22:04:01.573Z',
    '2022-05-01T23:54:59.776Z',
    '2000-04-18T01:59:11.556Z',
  ],

  EMOTIONS: ['smile', 'sleeping', 'puke', 'angry'],
};

export {
  FILMS_COUNT,
  MOST_COMMENTED_FILMS_COUNT,
  TOP_RATED_FILMS_COUNT,
  MAX_COMMENTS_ON_FILM,
  FilmMockData,
  CommentMockData,
  CommentLength,
};
