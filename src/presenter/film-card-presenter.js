import { Classes } from '../constants.js';

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

  constructor(commentsModel) {
    this.#commentsModel = commentsModel;
  }

  init = (film, container) => {
    this.#film = film;
    this.#container = container;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#film);
    this.#filmDetailsComponent = new FilmDetailsView(this.#film);

    this.#filmCardComponent.setClickHandler(this.#onFilmCardLinkClick);
    this.#filmDetailsComponent.setClickHandler(this.#onFilmDetailsCloseBtnClick);

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

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#filmDetailsComponent);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      showOverflow();
    }
  };

  #onFilmDetailsCloseBtnClick = () => {
    remove(this.#filmDetailsComponent);
    showOverflow();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #renderFilmComments = () => {
    const comments = [...this.#commentsModel.getComments(this.#film)];
    const filmCommentsContainer = this.#filmDetailsComponent.element.querySelector(
      '.film-details__comments-list',
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

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #onFilmCardLinkClick = () => this.#renderFilmDetails();
}
