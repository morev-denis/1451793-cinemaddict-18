import { FILM_COUNT, MAX_COMMENTS_ON_FILM } from '../constants.js';
import { getRandomInteger } from '../utils/common.js';

import Observable from '../framework/observable.js';
import { generateFilm } from '../mock/film.js';

export default class FilmsModel extends Observable {
  #filmsApiService = null;

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;

    filmsApiService.films.then((films) => {
      console.log(films);
    });
  }

  #generateFilms = () => {
    const films = Array.from({ length: FILM_COUNT }, generateFilm);

    let totalCommentsCount = 0;

    return films.map((film, index) => {
      const hasComments = getRandomInteger(0, 1);

      const filmCommentsCount = hasComments ? getRandomInteger(1, MAX_COMMENTS_ON_FILM) : 0;

      totalCommentsCount += filmCommentsCount;

      return {
        uniqId: film.uniqId,
        id: String(index + 1),
        comments: hasComments
          ? Array.from({ length: filmCommentsCount }, (_value, commentIndex) =>
            String(totalCommentsCount - commentIndex),
          )
          : [],
        filmInfo: film.filmInfo,
        userDetails: film.userDetails,
      };
    });
  };

  #films = this.#generateFilms();

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [...this.#films.slice(0, index), update, ...this.#films.slice(index + 1)];

    this._notify(updateType, update);
  };

  updateCommentsAfterDelComment = (updateType, update) => {
    const comments = [
      ...update.film.comments.slice(0, update.index),
      ...update.film.comments.slice(update.index + 1),
    ];

    this._notify(updateType, { ...update.film, comments });
  };

  updateCommentsAfterAddComment = (updateType, update) => {
    const comments = [...update.film.comments, update.сomment.id];

    this._notify(updateType, { ...update.film, comments });
  };
}
