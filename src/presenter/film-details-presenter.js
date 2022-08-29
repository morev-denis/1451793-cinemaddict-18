import { render, RenderPosition } from '../render.js';

import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsTopContainerView from '../view/film-details-top-container-view.js';
import FilmDetailsCloseView from '../view/film-details-close-view.js';
import FilmDetailsInfoWrapView from '../view/film-details-info-wrap-view.js';
import FilmDetailsPosterView from '../view/film-details-poster-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsBottomContainerView from '../view/film-details-bottom-container-view.js';
import FilmDetailsCommentsTitleView from '../view/film-details-comments-title-view.js';
import FilmDetailsCommentsListView from '../view/film-details-comments-list-view.js';
import FilmDetailsCommentView from '../view/film-details-comment-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';

const bodyElement = document.querySelector('body');

const hideOverflow = () => {
  bodyElement.classList.add('hide-overflow');
};

const showOverflow = () => {
  bodyElement.classList.remove('hide-overflow');
};

export default class FilmDetailsPresenter {
  #filmDetailsComponent = new FilmDetailsView();
  #filmDetailsTopContainerComponent = new FilmDetailsTopContainerView();
  #filmDetailsCloseComponent = new FilmDetailsCloseView();
  #filmDetailsInfoWrapComponent = new FilmDetailsInfoWrapView();
  #filmDetailsControlsComponent = new FilmDetailsControlsView();
  #filmDetailsBottomContainerComponent = new FilmDetailsBottomContainerView();
  #filmDetailsCommentsListComponent = new FilmDetailsCommentsListView();
  #filmDetailsFormComponent = new FilmDetailsFormView();

  #filmDetailsContainer = null;
  #filmsModel = null;
  #films = [];
  #commentsModel = null;
  #comments = [];

  init = (filmDetailsContainer, filmsModel, commentsModel) => {
    this.#filmDetailsContainer = filmDetailsContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
    this.#comments = [...this.#commentsModel.getComments(this.#films[0])];

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
        this.#filmDetailsComponent.element.remove();
        showOverflow();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onCloseBtnClick = () => {
      this.#filmDetailsComponent.element.remove();
      showOverflow();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    document.addEventListener('keydown', onEscKeyDown);

    filmDetailsCloseBtn.addEventListener('click', onCloseBtnClick);

    render(this.#filmDetailsInfoWrapComponent, this.#filmDetailsTopContainerComponent.element);

    render(new FilmDetailsPosterView(this.#films[0]), this.#filmDetailsInfoWrapComponent.element);

    render(new FilmDetailsInfoView(this.#films[0]), this.#filmDetailsInfoWrapComponent.element);

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
