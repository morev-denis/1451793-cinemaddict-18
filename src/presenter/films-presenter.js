import { MOST_COMMENTED_FILMS_COUNT, TOP_RATED_FILMS_COUNT } from '../constants.js';

import { render } from '../render.js';

import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsCommentView from '../view/film-details-comment-view.js';

const bodyNode = document.querySelector('body');
const siteFooterNode = document.querySelector('.footer');

const hideOverflow = () => {
  bodyNode.classList.add('hide-overflow');
};

const showOverflow = () => {
  bodyNode.classList.remove('hide-overflow');
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

  #renderFilmCard = (film, container) => {
    const filmCardComponent = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);

    const filmDetailsCloseBtn = filmDetailsComponent.element.querySelector(
      '.film-details__close-btn',
    );

    const filmCardLink = filmCardComponent.element.querySelector('.film-card__link');

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        bodyNode.removeChild(filmDetailsComponent.element);
        document.removeEventListener('keydown', onEscKeyDown);
        showOverflow();
      }
    };

    const onFilmDetailsCloseBtnClick = () => {
      bodyNode.removeChild(filmDetailsComponent.element);
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
      render(filmDetailsComponent, siteFooterNode, 'afterend');
      renderFilmComments();

      document.addEventListener('keydown', onEscKeyDown);
    };

    const onFilmCardLinkClick = () => renderFilmDetails();

    filmDetailsCloseBtn.addEventListener('click', onFilmDetailsCloseBtnClick);

    render(filmCardComponent, container);

    filmCardLink.addEventListener('click', onFilmCardLinkClick);
  };

  init = (filmsContainer, filmsModel, commentsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;

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
}
