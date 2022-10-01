export const adaptToServer = (film) => {
  const adaptedFilm = {
    ...film,
    'film_info': {
      ...film.filmInfo,
      'alternative_title': film.filmInfo.alternativeTitle,
      'total_rating': film.filmInfo.totalRating,
      'age_rating': film.filmInfo.ageRating,
    },
    'user_details': {
      ...film.userDetails,
      'already_watched': film.userDetails.alreadyWatched,
      'watching_date': film.userDetails.watchingDate,
    },
  };

  delete adaptedFilm.filmInfo;
  delete adaptedFilm.userDetails;

  return adaptedFilm;
};
