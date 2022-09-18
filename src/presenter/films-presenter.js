import {
  FILMS_COUNT_PER_STEP,
  MOST_COMMENTED_FILMS_COUNT,
  TOP_RATED_FILMS_COUNT,
  Classes,
  FilmsListTitle,
  SortType,
  Selectors,
} from '../constants.js';

import { updateItem } from '../utils/common.js';
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
  #films = [];
  #sourcedFilms = [];
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
    this.#films = [...this.#filmsModel.films];
    this.#sourcedFilms = [...this.#filmsModel.films];

    this.#commentsModel = commentsModel;
    this.#filters = generateFilter(this.#films);
    this.#mainNavigationComponent = new MainNavigationView(this.#filters);
    this.#footerStatisticsComponent = new FooterStatisticsView(this.#films);
  }

  #renderFilmCard = (film, container) => {
    const filmCardPresenter = new FilmCardPresenter(
      this.#commentsModel,
      this.#handleFilmCardChange,
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

  #onShowMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilmCard(film, this.#filmsListContainerComponent.element));
    this.#renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderFilmCards = (films, from, to, container) => {
    for (let i = from; i < to; i++) {
      this.#renderFilmCard(films[i], container);
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

  #sortFilms = (films, sortType) => {
    switch (sortType) {
      case SortType.DATE:
        films.sort((a, b) => sortByDate(b.filmInfo.release.date, a.filmInfo.release.date));
        break;
      case SortType.RATING:
        films.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;
      case SortType.COMMENTS_COUNT:
        films.sort((a, b) => b.comments.length - a.comments.length);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(this.#films, sortType);
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

  #renderFilmsList = () => {
    this.#renderFilmsListTitle(
      FilmsListTitle.MAIN_TITLE,
      this.#filmsListComponent.element,
      Classes.VISUALLY_HIDDEN_CLASS,
    );

    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilmCards(
      this.#films,
      0,
      Math.min(this.#films.length, FILMS_COUNT_PER_STEP),
      this.#filmsListContainerComponent.element,
    );

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
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

  #handleFilmCardChange = (updatedFilmCard, container) => {
    const prevMainNavigationComponent = this.#mainNavigationComponent;

    this.#films = updateItem(this.#films, updatedFilmCard);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilmCard);

    if (this.#filmCardPresenter.get(updatedFilmCard.uniqId)) {
      this.#filmCardPresenter.get(updatedFilmCard.uniqId).init(updatedFilmCard, container);
    }

    if (this.#filmCardTopRatedPresenter.get(updatedFilmCard.uniqId)) {
      this.#filmCardTopRatedPresenter.get(updatedFilmCard.uniqId).init(updatedFilmCard, container);
    }
    if (this.#filmCardMostCommentedPresenter.get(updatedFilmCard.uniqId)) {
      this.#filmCardMostCommentedPresenter
        .get(updatedFilmCard.uniqId)
        .init(updatedFilmCard, container);
    }

    this.#filters = generateFilter(this.#films);

    this.#mainNavigationComponent = new MainNavigationView(this.#filters);

    replace(this.#mainNavigationComponent, prevMainNavigationComponent);
  };

  #renderFilmsListTopRated = () => {
    render(this.#filmsListTopRatedComponent, this.#filmsComponent.element);

    render(this.#filmsListTopRatedContainerComponent, this.#filmsListTopRatedComponent.element);

    const topRatedFilms = [...this.#films];
    this.#sortFilms(topRatedFilms, SortType.RATING);

    this.#renderFilmCards(
      topRatedFilms,
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

    const mostCommentedFilms = [...this.#films];
    this.#sortFilms(mostCommentedFilms, SortType.COMMENTS_COUNT);

    this.#renderFilmCards(
      mostCommentedFilms,
      0,
      MOST_COMMENTED_FILMS_COUNT,
      this.#filmsListMostCommentedContainerComponent.element,
    );
  };

  #renderHeaderProfile = () => {
    render(this.#headerProfileComponent, siteHeaderElement);
  };

  #renderFooterStatistics = () => {
    render(this.#footerStatisticsComponent, footerStatisticsElement);
  };

  #renderFilms = () => {
    this.#renderSort();

    render(this.#filmsComponent, this.#filmsContainer);

    render(this.#filmsListComponent, this.#filmsComponent.element);

    if (this.#films.length === 0) {
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
    return this.#filmsModel.films;
  }

  init = () => {
    render(this.#mainNavigationComponent, siteMainElement);

    this.#renderFilms();
  };
}
