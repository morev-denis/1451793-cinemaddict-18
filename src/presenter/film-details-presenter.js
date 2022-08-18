import { render, RenderPosition } from '../render.js';

import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsTopContainerView from '../view/film-details-top-container-view.js';
import FilmDetailsCloseView from '../view/film-details-close-view.js';
import FilmDetailsInfoWrapView from '../view/film-details-info-wrap-view.js';
import FilmDetailsPosterView from '../view/film-details-poster-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsBottomContainerView from '../view/film-details-bottom-container-view.js';
import FilmDetailsCommentsListView from '../view/film-details-comments-list-view.js';
import FilmDetailsCommentView from '../view/film-details-comment-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';

const bodyElement = document.querySelector('body');

const hideOverflow = () => {
  bodyElement.classList.add('hide-overflow');
};

export default class FilmDetailsPresenter {
  filmDetailsComponent = new FilmDetailsView();
  filmDetailsTopContainerComponent = new FilmDetailsTopContainerView();
  filmDetailsCloseComponent = new FilmDetailsCloseView();
  filmDetailsInfoWrapComponent = new FilmDetailsInfoWrapView();
  FilmDetailsPosterComponent = new FilmDetailsPosterView();
  filmDetailsInfoComponent = new FilmDetailsInfoView();
  filmDetailsControlsComponent = new FilmDetailsControlsView();
  filmDetailsBottomContainerComponent = new FilmDetailsBottomContainerView();
  filmDetailsCommentsListComponent = new FilmDetailsCommentsListView();

  filmDetailsFormComponent = new FilmDetailsFormView();

  init = (filmDetailsContainer) => {
    this.filmDetailsContainer = filmDetailsContainer;

    hideOverflow();

    render(this.filmDetailsComponent, this.filmDetailsContainer, RenderPosition.AFTEREND);

    render(
      this.filmDetailsTopContainerComponent,
      this.filmDetailsComponent.getElement().firstElementChild,
    );

    render(this.filmDetailsCloseComponent, this.filmDetailsTopContainerComponent.getElement());

    render(this.filmDetailsInfoWrapComponent, this.filmDetailsTopContainerComponent.getElement());

    render(this.FilmDetailsPosterComponent, this.filmDetailsInfoWrapComponent.getElement());

    render(this.filmDetailsInfoComponent, this.filmDetailsInfoWrapComponent.getElement());

    render(this.filmDetailsControlsComponent, this.filmDetailsTopContainerComponent.getElement());

    render(
      this.filmDetailsBottomContainerComponent,
      this.filmDetailsComponent.getElement().firstElementChild,
    );

    render(this.filmDetailsCommentsListComponent, this.filmDetailsBottomContainerComponent.getElement().firstElementChild,);

    for (let i = 0; i < 4; i++) {
      render(new FilmDetailsCommentView(), this.filmDetailsCommentsListComponent.getElement());
    }

    render(
      this.filmDetailsFormComponent,
      this.filmDetailsBottomContainerComponent.getElement().firstElementChild,
    );
  };
}
