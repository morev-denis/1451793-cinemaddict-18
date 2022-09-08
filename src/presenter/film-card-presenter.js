import { Classes, Selectors } from '../constants.js';

import { render, remove, replace } from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsCommentView from '../view/film-details-comment-view.js';

const bodyElement = document.querySelector('body');
const siteFooterElement = document.querySelector('.footer');

const hideOverflow = () => {
  bodyElement.classList.add(Classes.HIDE_OVERFLOW_CLASS);
};

const showOverflow = () => {
  bodyElement.classList.remove(Classes.HIDE_OVERFLOW_CLASS);
};

export default class FilmCardPresenter {
  #film = null;
  #container = null;
  #filmCardComponent = null;
  #filmDetailsComponent = null;
  #commentsModel = null;
  #changeData = null;

  constructor(commentsModel, changeData) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
  }

  init = (film, container) => {
    this.#film = film;
    this.#container = container;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#film);
    this.#filmDetailsComponent = new FilmDetailsView(this.#film);

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

  #renderFilmComments = () => {
    const comments = [...this.#commentsModel.getComments(this.#film)];
    const filmCommentsContainer = this.#filmDetailsComponent.element.querySelector(
      Selectors.FILM_DETAILS_COMMENTS_LIST,
    );

    filmCommentsContainer.innerHTML = '';

    for (let i = 0; i < comments.length; i++) {
      render(new FilmDetailsCommentView(comments[i]), filmCommentsContainer);
    }
  };

  #renderFilmDetails = () => {
    hideOverflow();
    render(this.#filmDetailsComponent, siteFooterElement, 'afterend');
    this.#renderFilmComments();

    this.#filmDetailsComponent.setClickHandler(this.#handleFilmDetailsCloseBtnClick);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFilmCardLinkClick = () => this.#renderFilmDetails();
}
