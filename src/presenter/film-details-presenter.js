import { Classes, UserAction, UpdateType } from '../constants.js';

import { render, remove } from '../framework/render.js';

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

  constructor(commentsModel, changeData) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#commentsModel);

    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#handleFilmDetailsCloseBtnClick);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#handleDetailWatchlistClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandler(
      this.#handleDetailsAlreadyWatchedClick,
    );
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#handleDetailsFavoriteClick);
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#renderFilmDetails();
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };

  #handleDetailWatchlistClick = () => {
    remove(this.#filmDetailsComponent);
    this.#changeData(UserAction.UPDATE_FILM_DETAILS, UpdateType.MINOR, {
      ...this.#film,
      userDetails: { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist },
    });
  };

  #handleDetailsAlreadyWatchedClick = () => {
    remove(this.#filmDetailsComponent);
    this.#changeData(UserAction.UPDATE_FILM_DETAILS, UpdateType.MINOR, {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    });
  };

  #handleDetailsFavoriteClick = () => {
    remove(this.#filmDetailsComponent);
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
}
