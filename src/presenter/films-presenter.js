import {
  FILMS_COUNT_PER_STEP,
  MOST_COMMENTED_FILMS_COUNT,
  TOP_RATED_FILMS_COUNT,
  Classes,
  Selectors,
  FilmsListTitle,
} from '../constants.js';

import { render } from '../render.js';

import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsCommentView from '../view/film-details-comment-view.js';

const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const hideOverflow = () => {
  bodyElement.classList.add(Classes.HIDE_OVERFLOW_CLASS);
};

const showOverflow = () => {
  bodyElement.classList.remove(Classes.HIDE_OVERFLOW_CLASS);
};

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedContainerComponent = new FilmsListContainerView();
  #filmsListMostCommentedContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedComponent = new FilmsListTopRatedView();
  #filmsListMostCommentedComponent = new FilmsListMostCommentedView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #filmsContainer = null;
  #filmsModel = null;
  #films = [];
  #commentsModel = null;
  #renderedFilmCount = FILMS_COUNT_PER_STEP;

  #renderFilmCard = (film, container) => {
    const filmCardComponent = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);

    const filmDetailsCloseBtn = filmDetailsComponent.element.querySelector(
      '.film-details__close-btn',
    );

    const filmCardLink = filmCardComponent.element.querySelector(Selectors.FILM_CARD_LINK_SELECTOR);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        bodyElement.removeChild(filmDetailsComponent.element);
        document.removeEventListener('keydown', onEscKeyDown);
        showOverflow();
      }
    };

    const onFilmDetailsCloseBtnClick = () => {
      bodyElement.removeChild(filmDetailsComponent.element);
      showOverflow();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const renderFilmComments = () => {
      const comments = [...this.#commentsModel.getComments(film)];
      const filmCommentsContainer = filmDetailsComponent.element.querySelector(
        '.film-details__comments-list',
      );

      filmCommentsContainer.innerHTML = '';

      for (let i = 0; i < comments.length; i++) {
        render(new FilmDetailsCommentView(comments[i]), filmCommentsContainer);
      }
    };

    const renderFilmDetails = () => {
      hideOverflow();
      render(filmDetailsComponent, siteFooterElement, 'afterend');
      renderFilmComments();

      document.addEventListener('keydown', onEscKeyDown);
    };

    const onFilmCardLinkClick = () => renderFilmDetails();

    filmDetailsCloseBtn.addEventListener('click', onFilmDetailsCloseBtnClick);

    render(filmCardComponent, container);

    filmCardLink.addEventListener('click', onFilmCardLinkClick);
  };

  #onShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilmCard(film, this.#filmsListContainerComponent.element));
    this.#renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  init = (filmsContainer, filmsModel, commentsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;

    render(this.#filmsComponent, this.#filmsContainer);

    render(this.#filmsListComponent, this.#filmsComponent.element);

    if (this.#films.length === 0) {
      render(new FilmsListTitleView(FilmsListTitle.EMPTY_LIST), this.#filmsListComponent.element);
    } else {
      render(new SortView(), siteMainElement);

      const filmsListTitleComponent = new FilmsListTitleView(FilmsListTitle.MAIN_TITLE);

      filmsListTitleComponent.element.classList.add(Classes.VISUALLY_HIDDEN_CLASS);

      render(filmsListTitleComponent, this.#filmsListComponent.element);

      render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

      for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i++) {
        this.#renderFilmCard(this.#films[i], this.#filmsListContainerComponent.element);
      }

      if (this.#films.length > FILMS_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#filmsListComponent.element);

        this.#showMoreButtonComponent.element.addEventListener(
          'click',
          this.#onShowMoreButtonClick,
        );
      }
      render(this.#filmsListTopRatedComponent, this.#filmsComponent.element);

      render(this.#filmsListTopRatedContainerComponent, this.#filmsListTopRatedComponent.element);

      for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
        this.#renderFilmCard(this.#films[i], this.#filmsListTopRatedContainerComponent.element);
      }

      render(this.#filmsListMostCommentedComponent, this.#filmsComponent.element);

      render(
        this.#filmsListMostCommentedContainerComponent,
        this.#filmsListMostCommentedComponent.element,
      );

      for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
        this.#renderFilmCard(
          this.#films[i],
          this.#filmsListMostCommentedContainerComponent.element,
        );
      }
    }
  };
}
