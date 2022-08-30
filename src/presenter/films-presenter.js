import { MOST_COMMENTED_FILMS_COUNT, TOP_RATED_FILMS_COUNT } from '../constants.js';

import { render } from '../render.js';

import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';

import FilmDetailsPresenter from '../presenter/film-details-presenter.js';

const siteFooterNode = document.querySelector('.footer');

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedContainerComponent = new FilmsListContainerView();
  #filmsListMostCommentedContainerComponent = new FilmsListContainerView();
  #filmsListMostCommentedComponent = new FilmsListMostCommentedView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsListTopRatedComponent = new FilmsListTopRatedView();

  #filmDetailsPresenter = new FilmDetailsPresenter();

  #filmsContainer = null;
  #filmsModel = null;
  #films = [];

  init = (filmsContainer, filmsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];

    render(this.#filmsComponent, this.#filmsContainer);

    render(this.#filmsListComponent, this.#filmsComponent.element);

    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilmCard(this.#films[i], this.#filmsListContainerComponent.element);
    }

    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);

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
      this.#renderFilmCard(this.#films[i], this.#filmsListMostCommentedContainerComponent.element);
    }
  };

  #renderFilmCard = (film, container) => {
    const filmCardComponent = new FilmCardView(film);
    render(filmCardComponent, container);

    filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.#filmDetailsPresenter.init(siteFooterNode, film);
    });
  };
}
