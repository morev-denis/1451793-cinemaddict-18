export const adaptToServer = (film) => {
  const adaptedFilm = {
    ...film,
    'film_info': {
      ...film.filmInfo,
      'alternative_title': film.filmInfo.alternativeTitle,
      'total_rating': film.filmInfo.totalRating,
      'age_rating': film.filmInfo.ageRating,
      release: {
        ...film.filmInfo.release,
        'release_country': film.filmInfo.release.releaseCountry,
      }
    },
    'user_details': {
      ...film.userDetails,
      'already_watched': film.userDetails.alreadyWatched,
      'watching_date': film.userDetails.watchingDate,
    },
  };

  delete adaptedFilm.filmInfo;
  delete adaptedFilm['film_info'].alternativeTitle;
  delete adaptedFilm['film_info'].totalRating;
  delete adaptedFilm['film_info'].ageRating;
  delete adaptedFilm['film_info'].release.releaseCountry;
  delete adaptedFilm.userDetails;
  delete adaptedFilm['user_details'].alreadyWatched;
  delete adaptedFilm['user_details'].watchingDate;

  return adaptedFilm;
};
