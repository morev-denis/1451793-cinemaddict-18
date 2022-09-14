import { Classes } from '../constants.js';

import { render, remove, replace } from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';

const bodyElement = document.querySelector('body');
const siteFooterElement = document.querySelector('.footer');

const hideOverflow = () => {
  bodyElement.classList.add(Classes.HIDE_OVERFLOW_CLASS);
};

const showOverflow = () => {
  bodyElement.classList.remove(Classes.HIDE_OVERFLOW_CLASS);
};

const Mode = {
  DEFAULT: 'default',
  POPUP: 'popup',
};

export default class FilmCardPresenter {
  #film = null;
  #container = null;
  #filmCardComponent = null;
  #filmDetailsComponent = null;
  #commentsModel = null;
  #changeData = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;

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
    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#commentsModel);

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
    remove(this.#filmDetailsComponent);
  };

  #handleWatchlistClick = () => {
    this.#changeData(
      {
        ...this.#film,
        userDetails: { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist },
      },
      this.#container,
    );
  };

  #handleDetailWatchlistClick = () => {
    remove(this.#filmDetailsComponent);
    this.#changeData(
      {
        ...this.#film,
        userDetails: { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist },
      },
      this.#container,
    );
    this.#renderFilmDetails();
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData(
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          alreadyWatched: !this.#film.userDetails.alreadyWatched,
        },
      },
      this.#container,
    );
  };

  #handleDetailsAlreadyWatchedClick = () => {
    remove(this.#filmDetailsComponent);
    this.#changeData(
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          alreadyWatched: !this.#film.userDetails.alreadyWatched,
        },
      },
      this.#container,
    );
    this.#renderFilmDetails();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      {
        ...this.#film,
        userDetails: { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite },
      },
      this.#container,
    );
  };

  #handleDetailsFavoriteClick = () => {
    remove(this.#filmDetailsComponent);
    this.#changeData(
      {
        ...this.#film,
        userDetails: { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite },
      },
      this.#container,
    );
    this.#renderFilmDetails();
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

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      remove(this.#filmDetailsComponent);
      this.#mode = Mode.DEFAULT;
    }
  };

  #renderFilmDetails = () => {
    hideOverflow();
    render(this.#filmDetailsComponent, siteFooterElement, 'afterend');
    // this.#renderFilmComments();

    this.#filmDetailsComponent.setClickHandler(this.#handleFilmDetailsCloseBtnClick);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#handleDetailWatchlistClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandler(
      this.#handleDetailsAlreadyWatchedClick,
    );
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#handleDetailsFavoriteClick);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFilmCardLinkClick = () => {
    this.#changeMode();
    this.#mode = Mode.POPUP;
    this.#renderFilmDetails();
  };
}
