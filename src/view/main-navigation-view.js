import AbstractView from '../framework/view/abstract-view.js';
import { getFilteredFilmsCount } from '../utils/film.js';
import { FilterType } from '../constants.js';

const createMainNavigationTemplate = (filters) =>
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getFilteredFilmsCount(
    filters,
    FilterType.WATCHLIST,
  )}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getFilteredFilmsCount(
    filters,
    FilterType.HISTORY,
  )}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getFilteredFilmsCount(
    filters,
    FilterType.FAVORITES,
  )}</span></a>
  </nav>`;

export default class MainNavigationView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createMainNavigationTemplate(this.#filters);
  }
}
