import { UpdateType } from '../constants.js';
import Observable from '../framework/observable.js';
import { adaptToClient } from '../adapter/adapt-to-client.js';

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = [];
  #adaptToClient = null;

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  init = async () => {
    this.#adaptToClient = adaptToClient;

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

  updateFilm = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    try {
      const response = await this.#filmsApiService.updateFilm(update);
      const updatedFilm = this.#adaptToClient(response);
      this.#films = [...this.#films.slice(0, index), updatedFilm, ...this.#films.slice(index + 1)];
      this._notify(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t update film');
    }
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
}
