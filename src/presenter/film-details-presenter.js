import { Classes, UserAction, UpdateType, Mode } from '../constants.js';

import { render, remove, replace } from '../framework/render.js';

import FilmDetailsView from '../view/film-details-view.js';

const bodyElement = document.querySelector('body');
const siteFooterElement = document.querySelector('.footer');

const hideOverflow = () => {
  bodyElement.classList.add(Classes.HIDE_OVERFLOW_CLASS);
};

const showOverflow = () => {
  bodyElement.classList.remove(Classes.HIDE_OVERFLOW_CLASS);
};

export default class FilmDetailsPresenter {
  #film = null;
  #filmDetailsComponent = null;
  #commentsModel = null;
  #changeData = null;
  #mode = Mode.DEFAULT;

  constructor(commentsModel, changeData) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;

    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  init = (film, mode) => {
    this.#film = film;
    this.#mode = mode;

    const preventFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#commentsModel);

    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#handleFilmDetailsCloseBtnClick);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#handleDetailWatchlistClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandler(
      this.#handleDetailsAlreadyWatchedClick,
    );
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#handleDetailsFavoriteClick);
    this.#filmDetailsComponent.setDeleteClickHandler(this.#handleDeleteClick);
    document.addEventListener('keydown', this.#onEscKeyDown);

    if (preventFilmDetailsComponent === null || this.#mode === Mode.DEFAULT) {
      this.#renderFilmDetails();
    } else {
      replace(this.#filmDetailsComponent, preventFilmDetailsComponent);
    }
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };

  #handleDeleteClick = (payload) => {
    this.#changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, payload);
  };

  #handleDetailWatchlistClick = () => {
    this.#changeData(UserAction.UPDATE_FILM_DETAILS, UpdateType.MINOR, {
      ...this.#film,
      userDetails: { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist },
    });
  };

  #handleDetailsAlreadyWatchedClick = () => {
    this.#changeData(UserAction.UPDATE_FILM_DETAILS, UpdateType.MINOR, {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    });
  };

  #handleDetailsFavoriteClick = () => {
    this.#changeData(UserAction.UPDATE_FILM_DETAILS, UpdateType.MINOR, {
      ...this.#film,
      userDetails: { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite },
    });
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#filmDetailsComponent);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      showOverflow();
    }
  };

  #handleFilmDetailsCloseBtnClick = () => {
    remove(this.#filmDetailsComponent);
    showOverflow();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #renderFilmDetails = () => {
    hideOverflow();
    render(this.#filmDetailsComponent, siteFooterElement, 'afterend');
  };

  #handleModelEvent = (event, payload) => {
    switch (event) {
      case UpdateType.PATCH:
        this.init(payload);
        break;
      case UpdateType.MINOR:
        this.init(payload);
        break;
    }
  };
}
