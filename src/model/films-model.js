import { UpdateType } from '../constants.js';
import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  init = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch (err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  };

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

  updateCommentsAfterAddComment = (updateType, update) => {
    const comments = [...update.film.comments, update.сomment.id];

    this._notify(updateType, { ...update.film, comments });
  };

  updateCommentsAfterDelComment = (updateType, update) => {
    const comments = [
      ...update.film.comments.slice(0, update.index),
      ...update.film.comments.slice(update.index + 1),
    ];

    this._notify(updateType, { ...update.film, comments });
  };

  #adaptToClient = (film) => {
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
}
