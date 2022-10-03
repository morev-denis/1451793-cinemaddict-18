import {
  FILM_COUNT_PER_STEP,
  MOST_COMMENTED_FILM_COUNT,
  TOP_RATED_FILM_COUNT,
  Classes,
  FilterType,
  SortType,
  Selectors,
  UpdateType,
  UserAction,
  TimeLimit,
  Rank,
} from '../constants.js';

import { sortByDate } from '../utils/film.js';
import { filter } from '../utils/filter.js';

import { render, remove, RenderPosition, replace } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import HeaderProfileView from '../view/header-profile-view.js';
import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';

import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import LoadingView from '../view/loading-view.js';

import FilmCardPresenter from './film-card-presenter.js';
import FilmDetailsPresenter from './film-details-presenter.js';
import FilterPresenter from './filter-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector(Selectors.FOOTER_STATISTICS);

export default class FilmsPresenter {
  #headerProfileComponent = null;
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedContainerComponent = new FilmsListContainerView();
  #filmsListMostCommentedContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedComponent = new FilmsListTopRatedView();
  #filmsListMostCommentedComponent = new FilmsListMostCommentedView();
  #loadingComponent = new LoadingView();
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);
  #filmDetailsPresenter = null;
  #showMoreButtonComponent = null;
  #sortComponent = null;
  #filterPresenter = null;
  #filterType = FilterType.ALL;

  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #footerStatisticsComponent = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #filmCardPresenter = new Map();
  #filmCardTopRatedPresenter = new Map();
  #filmCardMostCommentedPresenter = new Map();
  #filmsListTitleComponent = null;
  #isLoading = true;

  constructor(filmsContainer, filmsModel, commentsModel, filterModel) {
    this.#filmsContainer = filmsContainer;

    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmDetailsPresenter = new FilmDetailsPresenter(
      this.#commentsModel,
      this.#handleViewAction,
    );

    this.#filterPresenter = new FilterPresenter(
      siteMainElement,
      this.#filterModel,
      this.#filmsModel,
    );

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  #renderFilmCard = (film, container) => {
    const filmCardPresenter = new FilmCardPresenter(
      this.#commentsModel,
      this.#handleViewAction,
      this.#filmDetailsPresenter,
    );
    filmCardPresenter.init(film, container);
    switch (container) {
      case this.#filmsListTopRatedContainerComponent.element:
        this.#filmCardTopRatedPresenter.set(film.id, filmCardPresenter);
        break;
      case this.#filmsListMostCommentedContainerComponent.element:
        this.#filmCardMostCommentedPresenter.set(film.id, filmCardPresenter);
        break;
      default:
        this.#filmCardPresenter.set(film.id, filmCardPresenter);
    }
  };

  #handleShowMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
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
    this.#showMoreButtonComponent = new ShowMoreButtonView();

    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);

    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
  };

  #renderFilmsListTitle = (titleContainer, titleClass = '') => {
    if (this.#filmsListComponent) {
      remove(this.#filmsListTitleComponent);
    }

    this.#filmsListTitleComponent = new FilmsListTitleView(this.#filterType);

    if (titleClass) {
      this.#filmsListTitleComponent.element.classList.add(titleClass);
    }

    render(this.#filmsListTitleComponent, titleContainer);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilms({ resetRenderedFilmCount: true });
    this.#renderFilms();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#filmsComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearFilms = ({ resetRenderedFilmCount = false, resetSortType = false } = {}) => {
    const filmCount = this.films.length;

    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();

    this.#filmCardTopRatedPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardTopRatedPresenter.clear();

    this.#filmCardMostCommentedPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardMostCommentedPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_FILM:
        if (this.#filmCardPresenter.get(update.id)) {
          this.#filmCardPresenter.get(update.id).setUpdatingUserDetails();
        }
        if (this.#filmCardTopRatedPresenter.get(update.id)) {
          this.#filmCardTopRatedPresenter.get(update.id).setUpdatingUserDetails();
        }
        if (this.#filmCardMostCommentedPresenter.get(update.id)) {
          this.#filmCardMostCommentedPresenter.get(update.id).setUpdatingUserDetails();
        }
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch (err) {
          if (this.#filmCardPresenter.get(update.id)) {
            this.#filmCardPresenter.get(update.id).setAborting();
          }
          if (this.#filmCardTopRatedPresenter.get(update.id)) {
            this.#filmCardTopRatedPresenter.get(update.id).setAborting();
          }
          if (this.#filmCardMostCommentedPresenter.get(update.id)) {
            this.#filmCardMostCommentedPresenter.get(update.id).setAborting();
          }
        }
        break;
      case UserAction.UPDATE_FILM_DETAILS:
        this.#filmDetailsPresenter.setUpdatingUserDetails();
        try {
          await this.#filmsModel.updateFilm(updateType, update);
          this.#filmDetailsPresenter.init(update, this.#commentsModel.comments);
        } catch (err) {
          this.#filmDetailsPresenter.setAbortingUpdateUserDetails();
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmDetailsPresenter.setDeleting(update.film.comments[update.index]);
        try {
          await this.#commentsModel.deleteComment(updateType, update).finally(() => {
            this.#filmsModel.init();
          });
        } catch (err) {
          this.#filmDetailsPresenter.setAbortingDeleteComment();
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#filmDetailsPresenter.setSubmitting();
        try {
          await this.#commentsModel.addComment(updateType, update).finally(() => {
            this.#filmsModel.init();
          });
        } catch (err) {
          this.#filmDetailsPresenter.setAbortingAddComment();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#filmCardPresenter.get(data.id)) {
          this.#filmCardPresenter.get(data.id).init(data, this.#filmsContainer);
        }

        if (this.#filmCardTopRatedPresenter.get(data.id)) {
          this.#filmCardTopRatedPresenter.get(data.id).init(data, this.#filmsContainer);
        }

        if (this.#filmCardMostCommentedPresenter.get(data.id)) {
          this.#filmCardMostCommentedPresenter.get(data.id).init(data, this.#filmsContainer);
        }
        break;
      case UpdateType.MINOR:
        this.#clearFilms();
        this.#renderFilms();
        break;
      case UpdateType.MAJOR:
        this.#clearFilms({ resetRenderedFilmCount: true, resetSortType: true });
        this.#renderFilms();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearFilms();
        this.#renderFilms();
        break;
    }
  };

  #renderHeaderProfile = () => {
    const alreadyWatchedFilmsCount = this.#filmsModel.films.filter(
      (film) => film.userDetails.alreadyWatched,
    ).length;
    let rank = Rank.WITHOUT_RANK;

    if (alreadyWatchedFilmsCount >= 1 && alreadyWatchedFilmsCount <= 10) {
      rank = Rank.NOVICE;
    }

    if (alreadyWatchedFilmsCount >= 11 && alreadyWatchedFilmsCount <= 20) {
      rank = Rank.FAN;
    }
    if (alreadyWatchedFilmsCount >= 21) {
      rank = Rank.MOVIE_BUFF;
    }

    const prevHeaderProfileComponent = this.#headerProfileComponent;
    this.#headerProfileComponent = new HeaderProfileView(rank);

    if (prevHeaderProfileComponent === null) {
      render(this.#headerProfileComponent, siteHeaderElement);
    } else {
      replace(this.#headerProfileComponent, prevHeaderProfileComponent);
      remove(prevHeaderProfileComponent);
    }
  };

  #renderFilmsListTopRated = () => {
    render(this.#filmsListTopRatedComponent, this.#filmsComponent.element);

    render(this.#filmsListTopRatedContainerComponent, this.#filmsListTopRatedComponent.element);

    const topRatedFilms = [...this.films]
      .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
      .slice(0, TOP_RATED_FILM_COUNT);

    this.#renderFilmCards(topRatedFilms, this.#filmsListTopRatedContainerComponent.element);
  };

  #renderFilmsListMostCommented = () => {
    render(this.#filmsListMostCommentedComponent, this.#filmsComponent.element);

    render(
      this.#filmsListMostCommentedContainerComponent,
      this.#filmsListMostCommentedComponent.element,
    );

    const mostCommentedFilms = [...this.films]
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, MOST_COMMENTED_FILM_COUNT);

    this.#renderFilmCards(
      mostCommentedFilms,
      this.#filmsListMostCommentedContainerComponent.element,
    );
  };

  #renderFooterStatistics = () => {
    const prevFooterStatisticsComponent = this.#footerStatisticsComponent;

    this.#footerStatisticsComponent = new FooterStatisticsView(this.#filmsModel.films.length);

    if (prevFooterStatisticsComponent === null) {
      render(this.#footerStatisticsComponent, footerStatisticsElement);
    } else {
      replace(this.#footerStatisticsComponent, prevFooterStatisticsComponent);
      remove(prevFooterStatisticsComponent);
    }
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#filmsComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderFilms = () => {
    render(this.#filmsComponent, this.#filmsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const films = this.films;
    const filmCount = films.length;

    render(this.#filmsListComponent, this.#filmsComponent.element);

    this.#filterPresenter.init();

    this.#renderFooterStatistics();

    if (filmCount !== 0 && this.#filterType === FilterType.ALL) {
      this.#renderSort();
      this.#renderFilmsListTitle(this.#filmsListComponent.element, Classes.VISUALLY_HIDDEN_CLASS);
    } else {
      remove(this.#filmsListTitleComponent);
      if (filmCount === 0) {
        this.#renderFilmsListTitle(this.#filmsListComponent.element);
      } else {
        this.#renderSort();
      }
    }

    this.#renderHeaderProfile();

    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilmCards(
      this.films.slice(0, Math.min(filmCount, this.#renderedFilmCount)),
      this.#filmsListContainerComponent.element,
    );

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }

    this.#renderFilmsListTopRated();

    this.#renderFilmsListMostCommented();
  };

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort((a, b) =>
          sortByDate(b.filmInfo.release.date, a.filmInfo.release.date),
        );
      case SortType.RATING:
        return filteredFilms.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderFilms();
  };
}
