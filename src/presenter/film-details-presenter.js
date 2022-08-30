import { render, RenderPosition } from '../render.js';

import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsTopContainerView from '../view/film-details-top-container-view.js';
import FilmDetailsCloseView from '../view/film-details-close-view.js';
import FilmDetailsInfoWrapView from '../view/film-details-info-wrap-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsBottomContainerView from '../view/film-details-bottom-container-view.js';
import FilmDetailsCommentsTitleView from '../view/film-details-comments-title-view.js';
import FilmDetailsCommentsListView from '../view/film-details-comments-list-view.js';
import FilmDetailsCommentView from '../view/film-details-comment-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';

import FilmsModel from '../model/films-model.js';
import CommentsModel from '../model/comments-model.js';

const bodyNode = document.querySelector('body');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

const hideOverflow = () => {
  bodyNode.classList.add('hide-overflow');
};

const showOverflow = () => {
  bodyNode.classList.remove('hide-overflow');
};

export default class FilmDetailsPresenter {
  #filmDetailsComponent = new FilmDetailsView();
  #filmDetailsTopContainerComponent = new FilmDetailsTopContainerView();
  #filmDetailsCloseComponent = new FilmDetailsCloseView();
  #filmDetailsControlsComponent = new FilmDetailsControlsView();
  #filmDetailsBottomContainerComponent = new FilmDetailsBottomContainerView();
  #filmDetailsCommentsListComponent = new FilmDetailsCommentsListView();
  #filmDetailsFormComponent = new FilmDetailsFormView();

  #filmDetailsContainer = null;
  #filmsModel = null;
  #films = [];
  #commentsModel = null;
  #comments = [];

  init = (filmDetailsContainer, film) => {
    this.#filmDetailsContainer = filmDetailsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
    this.#comments = [...this.#commentsModel.getComments(film)];

    hideOverflow();

    render(this.#filmDetailsComponent, this.#filmDetailsContainer, RenderPosition.AFTEREND);

    render(
      this.#filmDetailsTopContainerComponent,
      this.#filmDetailsComponent.element.firstElementChild,
    );

    render(this.#filmDetailsCloseComponent, this.#filmDetailsTopContainerComponent.element);

    const filmDetailsCloseBtn = this.#filmDetailsCloseComponent.element.querySelector(
      '.film-details__close-btn',
    );

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        // bodyNode.removeChild(this.#filmDetailsComponent.element);
        showOverflow();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onCloseBtnClick = () => {
      // bodyNode.removeChild(this.#filmDetailsComponent.element);
      showOverflow();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    document.addEventListener('keydown', onEscKeyDown);

    filmDetailsCloseBtn.addEventListener('click', onCloseBtnClick);

    render(new FilmDetailsInfoWrapView(film), this.#filmDetailsTopContainerComponent.element);

    render(this.#filmDetailsControlsComponent, this.#filmDetailsTopContainerComponent.element);

    render(
      this.#filmDetailsBottomContainerComponent,
      this.#filmDetailsComponent.element.firstElementChild,
    );

    render(
      new FilmDetailsCommentsTitleView(this.#comments),
      this.#filmDetailsBottomContainerComponent.element.firstElementChild,
    );

    render(
      this.#filmDetailsCommentsListComponent,
      this.#filmDetailsBottomContainerComponent.element.firstElementChild,
    );

    for (let i = 0; i < this.#comments.length; i++) {
      render(
        new FilmDetailsCommentView(this.#comments[i]),
        this.#filmDetailsCommentsListComponent.element,
      );
    }

    render(
      this.#filmDetailsFormComponent,
      this.#filmDetailsBottomContainerComponent.element.firstElementChild,
    );
  };
}
