export const generateFilm = () => ({
  id: '0',
  comments: [1, 2],
  filmInfo: {
    title: 'A Little Pony Without The Carpet',
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: 5.3,
    poster: 'images/posters/santa-claus-conquers-the-martians.jpg',
    ageRating: 0,
    director: 'Tom Ford',
    writers: ['Takeshi Kitano', 'Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Morgan Freeman', 'Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland',
    },
    runtime: 77,
    genre: ['Comedy', 'Drama', 'Mystery'],
    description:
      'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false,
  },
});
