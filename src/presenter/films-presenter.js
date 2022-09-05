import {
  FILMS_COUNT_PER_STEP,
  MOST_COMMENTED_FILMS_COUNT,
  TOP_RATED_FILMS_COUNT,
  Classes,
  FilmsListTitle,
} from '../constants.js';

import { render, remove } from '../framework/render.js';

import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view';
import FilmsListContainerView from '../view/films-list-container-view.js';

import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';

import FilmCardPresenter from './film-card-presenter.js';

const siteMainElement = document.querySelector('.main');

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

  constructor(filmsContainer, filmsModel, commentsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
  }

  #renderFilmCard = (film, container) => {
    const filmCardPresenter = new FilmCardPresenter(this.#commentsModel);
    filmCardPresenter.init(film, container);
  };

  #onShowMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilmCard(film, this.#filmsListContainerComponent.element));
    this.#renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderFilmCards = (from, to, container) => {
    for (let i = from; i < to; i++) {
      this.#renderFilmCard(this.#films[i], container);
    }
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);

    this.#showMoreButtonComponent.setClickHandler(this.#onShowMoreButtonClick);
  };

  #renderFilmsListTitle = (titleText, titleContainer, titleClass = '') => {
    const filmsListTitleComponent = new FilmsListTitleView(titleText);

    if (titleClass) {
      filmsListTitleComponent.element.classList.add(titleClass);
    }

    render(filmsListTitleComponent, titleContainer);
  };

  #renderSort = () => {
    render(new SortView(), siteMainElement);
  };

  #renderFilmsList = () => {
    this.#renderSort();

    this.#renderFilmsListTitle(
      FilmsListTitle.MAIN_TITLE,
      this.#filmsListComponent.element,
      Classes.VISUALLY_HIDDEN_CLASS,
    );

    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilmCards(
      0,
      Math.min(this.#films.length, FILMS_COUNT_PER_STEP),
      this.#filmsListContainerComponent.element,
    );

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilmsListTopRated = () => {
    render(this.#filmsListTopRatedComponent, this.#filmsComponent.element);

    render(this.#filmsListTopRatedContainerComponent, this.#filmsListTopRatedComponent.element);

    this.#renderFilmCards(
      0,
      TOP_RATED_FILMS_COUNT,
      this.#filmsListTopRatedContainerComponent.element,
    );
  };

  #renderFilmsListMostCommented = () => {
    render(this.#filmsListMostCommentedComponent, this.#filmsComponent.element);

    render(
      this.#filmsListMostCommentedContainerComponent,
      this.#filmsListMostCommentedComponent.element,
    );

    this.#renderFilmCards(
      0,
      MOST_COMMENTED_FILMS_COUNT,
      this.#filmsListMostCommentedContainerComponent.element,
    );
  };

  #renderFilms = () => {
    render(this.#filmsComponent, this.#filmsContainer);

    render(this.#filmsListComponent, this.#filmsComponent.element);

    if (this.#films.length === 0) {
      this.#renderFilmsListTitle(FilmsListTitle.EMPTY_LIST, this.#filmsListComponent.element);
    } else {
      this.#renderFilmsList();

      this.#renderFilmsListTopRated();

      this.#renderFilmsListMostCommented();
    }
  };

  init = () => {
    this.#renderFilms();
  };
}
