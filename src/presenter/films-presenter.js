import {
  FILMS_COUNT_PER_STEP,
  MOST_COMMENTED_FILMS_COUNT,
  TOP_RATED_FILMS_COUNT,
  Classes,
  FilmsListTitle,
  SortType,
  Selectors,
} from '../constants.js';

import { sortByDate } from '../utils/film.js';

import { generateFilter } from '../mock/filter.js';

import { render, remove, replace } from '../framework/render.js';

import HeaderProfileView from '../view/header-profile-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view';
import FilmsListContainerView from '../view/films-list-container-view.js';

import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';

import FilmCardPresenter from './film-card-presenter.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector(Selectors.FOOTER_STATISTICS);

export default class FilmsPresenter {
  #headerProfileComponent = new HeaderProfileView();
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedContainerComponent = new FilmsListContainerView();
  #filmsListMostCommentedContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedComponent = new FilmsListTopRatedView();
  #filmsListMostCommentedComponent = new FilmsListMostCommentedView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #sortComponent = null;

  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filters = null;
  #mainNavigationComponent = null;
  #footerStatisticsComponent = null;
  #renderedFilmCount = FILMS_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #filmCardPresenter = new Map();
  #filmCardTopRatedPresenter = new Map();
  #filmCardMostCommentedPresenter = new Map();

  constructor(filmsContainer, filmsModel, commentsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;

    this.#commentsModel = commentsModel;
    this.#filters = generateFilter(this.films);
    this.#mainNavigationComponent = new MainNavigationView(this.#filters);
    this.#footerStatisticsComponent = new FooterStatisticsView(this.films);

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  #renderFilmCard = (film, container) => {
    const filmCardPresenter = new FilmCardPresenter(
      this.#commentsModel,
      this.#handleViewAction,
      this.#handleModeChange,
    );
    filmCardPresenter.init(film, container);
    switch (container) {
      case this.#filmsListTopRatedContainerComponent.element:
        this.#filmCardTopRatedPresenter.set(film.uniqId, filmCardPresenter);
        break;
      case this.#filmsListMostCommentedContainerComponent.element:
        this.#filmCardMostCommentedPresenter.set(film.uniqId, filmCardPresenter);
        break;
      default:
        this.#filmCardPresenter.set(film.uniqId, filmCardPresenter);
    }
  };

  #handleShowMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(
      filmCount,
      this.#renderedFilmCount + FILMS_COUNT_PER_STEP,
    );
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilmCards(films, this.#filmsListContainerComponent.element);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderFilmCards = (films, container) => {
    films.forEach((film) => this.#renderFilmCard(film, container));
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);

    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderFilmsListTitle = (titleText, titleContainer, titleClass = '') => {
    const filmsListTitleComponent = new FilmsListTitleView(titleText);

    if (titleClass) {
      filmsListTitleComponent.element.classList.add(titleClass);
    }

    render(filmsListTitleComponent, titleContainer);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilms();
    this.#renderFilms();
  };

  #renderSort = () => {
    if (this.#sortComponent) {
      const prevSortComponent = this.#sortComponent;
      this.#sortComponent = new SortView(this.#currentSortType);
      this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
      replace(this.#sortComponent, prevSortComponent);
    } else {
      this.#sortComponent = new SortView(this.#currentSortType);
      render(this.#sortComponent, siteMainElement);
      this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    }
  };

  #handleModeChange = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearFilms = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();
    this.#renderedFilmCount = FILMS_COUNT_PER_STEP;
    this.#filmCardTopRatedPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardTopRatedPresenter.clear();
    this.#filmCardMostCommentedPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardMostCommentedPresenter.clear();
    remove(this.#showMoreButtonComponent);
  };

  #handleViewAction = (actionType, updatedType, update) => {
    console.log(actionType, updatedType, update);
  };

  #handleModelEvent = (updatedType, data) => {
    console.log(updatedType, data);
  };

  #renderHeaderProfile = () => {
    render(this.#headerProfileComponent, siteHeaderElement);
  };

  #renderFilmsList = () => {
    this.#renderFilmsListTitle(
      FilmsListTitle.MAIN_TITLE,
      this.#filmsListComponent.element,
      Classes.VISUALLY_HIDDEN_CLASS,
    );

    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilmCards(
      this.films.slice(0, Math.min(this.films.length, FILMS_COUNT_PER_STEP)),
      this.#filmsListContainerComponent.element,
    );

    if (this.films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilmsListTopRated = () => {
    render(this.#filmsListTopRatedComponent, this.#filmsComponent.element);

    render(this.#filmsListTopRatedContainerComponent, this.#filmsListTopRatedComponent.element);

    const topRatedFilms = [...this.films].slice(0, TOP_RATED_FILMS_COUNT);

    this.#renderFilmCards(topRatedFilms, this.#filmsListTopRatedContainerComponent.element);
  };

  #renderFilmsListMostCommented = () => {
    render(this.#filmsListMostCommentedComponent, this.#filmsComponent.element);

    render(
      this.#filmsListMostCommentedContainerComponent,
      this.#filmsListMostCommentedComponent.element,
    );

    const mostCommentedFilms = [...this.films].slice(0, MOST_COMMENTED_FILMS_COUNT);

    this.#renderFilmCards(
      mostCommentedFilms,
      this.#filmsListMostCommentedContainerComponent.element,
    );
  };

  #renderFooterStatistics = () => {
    render(this.#footerStatisticsComponent, footerStatisticsElement);
  };

  #renderFilms = () => {
    this.#renderSort();

    render(this.#filmsComponent, this.#filmsContainer);

    render(this.#filmsListComponent, this.#filmsComponent.element);

    if (this.films.length === 0) {
      this.#renderFilmsListTitle(FilmsListTitle.EMPTY_LIST, this.#filmsListComponent.element);
    } else {
      this.#renderHeaderProfile();

      this.#renderFilmsList();

      this.#renderFilmsListTopRated();

      this.#renderFilmsListMostCommented();

      this.#renderFooterStatistics();
    }
  };

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort((a, b) =>
          sortByDate(b.filmInfo.release.date, a.filmInfo.release.date),
        );
      case SortType.RATING:
        return [...this.#filmsModel.films].sort(
          (a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating,
        );
      case SortType.COMMENTS_COUNT:
        return [...this.#filmsModel.films].sort((a, b) => b.comments.length - a.comments.length);
    }

    return this.#filmsModel.films;
  }

  init = () => {
    render(this.#mainNavigationComponent, siteMainElement);

    this.#renderFilms();
  };
}
