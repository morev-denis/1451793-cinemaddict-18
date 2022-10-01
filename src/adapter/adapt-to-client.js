export const adaptToClient = (film) => {
  const adaptedFilm = {
    ...film,
    filmInfo: {
      ...film['film_info'],
      alternativeTitle: film['film_info']['alternative_title'],
      totalRating: film['film_info']['total_rating'],
      ageRating: film['film_info']['age_rating'],
    },
    userDetails: {
      ...film['user_details'],
      alreadyWatched: film['user_details']['already_watched'],
      watchingDate: film['user_details']['watching_date'],
    },
  };

  delete adaptedFilm['film_info'];
  delete adaptedFilm['user_details'];

  return adaptedFilm;
};
