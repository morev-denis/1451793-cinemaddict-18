import { render } from '../render.js';

import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';

export default class FilmsListContainerPresenter {
  filmsListContainerComponent = new FilmsListContainerView();

  init = (filmsListContainer, filmsCount) => {
    this.filmsListContainer = filmsListContainer;
    render(this.filmsListContainerComponent, filmsListContainer);

    for (let i = 0; i < filmsCount; i++) {
      render(new FilmCardView(), this.filmsListContainerComponent.getElement());
    }
  };
}
