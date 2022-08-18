import { render, RenderPosition } from '../render.js';

import FilmDetailsView from '../view/film-details-view.js';

import FilmDetailsTopContainerPresenter from './film-details-top-container-presenter.js';
import FilmDetailsBottomContainerPresenter from './film-details-bottom-container-presenter.js';

const filmDetailsTopContainerPresenter = new FilmDetailsTopContainerPresenter();
const filmDetailsBottomContainerPresenter = new FilmDetailsBottomContainerPresenter();

const bodyElement = document.querySelector('body');

const hideOverflow = () => {
  bodyElement.classList.add('hide-overflow');
};

export default class FilmDetailsPresenter {
  filmDetailsComponent = new FilmDetailsView();

  init = (filmDetailsContainer) => {
    this.filmDetailsContainer = filmDetailsContainer;

    hideOverflow();

    render(this.filmDetailsComponent, this.filmDetailsContainer, RenderPosition.AFTEREND);

    filmDetailsTopContainerPresenter.init(this.filmDetailsComponent.getElement().firstElementChild);

    filmDetailsBottomContainerPresenter.init(
      this.filmDetailsComponent.getElement().firstElementChild,
    );
  };
}
