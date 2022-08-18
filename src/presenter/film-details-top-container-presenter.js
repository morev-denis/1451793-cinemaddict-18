import { render } from '../render.js';

import FilmDetailsTopContainerView from '../view/film-details-top-container-view.js';
import FilmDetailsCloseView from '../view/film-details-close-view.js';
import FilmDetailsInfoWrapView from '../view/film-details-info-wrap-view.js';
import FilmDetailsPosterView from '../view/film-details-poster-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';

export default class FilmDetailsTopContainerPresenter {
  filmDetailsTopContainerComponent = new FilmDetailsTopContainerView();
  filmDetailsCloseComponent = new FilmDetailsCloseView();
  filmDetailsInfoWrapComponent = new FilmDetailsInfoWrapView();
  FilmDetailsPosterComponent = new FilmDetailsPosterView();
  filmDetailsInfoComponent = new FilmDetailsInfoView();
  filmDetailsControlsComponent = new FilmDetailsControlsView();

  init = (filmDetailsTopContainer) => {
    this.filmDetailsTopContainer = filmDetailsTopContainer;

    render(this.filmDetailsTopContainerComponent, this.filmDetailsTopContainer);

    render(this.filmDetailsCloseComponent, this.filmDetailsTopContainerComponent.getElement());

    render(this.filmDetailsInfoWrapComponent, this.filmDetailsTopContainerComponent.getElement());

    render(this.FilmDetailsPosterComponent, this.filmDetailsInfoWrapComponent.getElement());

    render(this.filmDetailsInfoComponent, this.filmDetailsInfoWrapComponent.getElement());

    render(this.filmDetailsControlsComponent, this.filmDetailsTopContainerComponent.getElement());
  };
}
