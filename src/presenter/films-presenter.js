import { render } from '../render.js';

import FilmsView from '../view/films-view.js';

import FilmsListPresenter from './films-list-presenter.js';
import FilmsListTopRatedPresenter from './films-list-top-rated-presenter.js';
import FilmsListMostCommentedPresenter from './films-list-most-commented-presenter.js';

const filmsListPresenter = new FilmsListPresenter();
const filmsListTopRatedPresenter = new FilmsListTopRatedPresenter();
const filmsListMostCommentedPresenter = new FilmsListMostCommentedPresenter();

export default class FilmsPresenter {
  filmsComponent = new FilmsView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;
    render(this.filmsComponent, filmsContainer);

    filmsListPresenter.init(this.filmsComponent.getElement());
    filmsListTopRatedPresenter.init(this.filmsComponent.getElement());
    filmsListMostCommentedPresenter.init(this.filmsComponent.getElement());
  };
}
