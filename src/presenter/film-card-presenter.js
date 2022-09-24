import { UserAction, UpdateType, Mode } from '../constants.js';

import { render, remove, replace } from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';

import FilmDetailsPresenter from './film-details-presenter.js';

export default class FilmCardPresenter {
  #film = null;
  #container = null;
  #filmCardComponent = null;
  #commentsModel = null;
  #changeData = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;

  #filmDetailsPresenter = new Map();

  constructor(commentsModel, changeData, changeMode) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film, container) => {
    this.#film = film;
    this.#container = container;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setClickHandler(this.#handleFilmCardLinkClick);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#container);
    } else {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  #handleWatchlistClick = () => {
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, {
      ...this.#film,
      userDetails: { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist },
    });
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    });
  };

  #handleFavoriteClick = () => {
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, {
      ...this.#film,
      userDetails: { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite },
    });
  };

  resetView = () => {
    this.#filmDetailsPresenter.forEach((presenter) => presenter.destroy());
    this.#filmDetailsPresenter.clear();
  };

  #handleFilmCardLinkClick = () => {
    this.#changeMode();
    const filmDetailsPresenter = new FilmDetailsPresenter(this.#commentsModel, this.#changeData);
    filmDetailsPresenter.init(this.#film);
    this.#filmDetailsPresenter.set(this.#film.uniqId, filmDetailsPresenter);

    this.#mode = Mode.POPUP;
  };
}
