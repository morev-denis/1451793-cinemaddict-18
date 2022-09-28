import AbstractView from '../framework/view/abstract-view.js';
import { getFilteredFilmsCount } from '../utils/film.js';
import { Classes } from '../constants.js';

const createMainNavigationTemplate = (filters, currentFilterType) =>
  `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item ${
  currentFilterType === 'all' ? Classes.MAIN_NAVIGATION_ACTIVE_CLASS : ''
}" data-type="all">
        All movies
      </a>
      <a href="#watchlist" class="main-navigation__item ${
  currentFilterType === 'watchlist' ? Classes.MAIN_NAVIGATION_ACTIVE_CLASS : ''
}" data-type="watchlist">
        Watchlist
        <span class="main-navigation__item-count">
          ${getFilteredFilmsCount(filters, 'Watchlist')}
        </span>
      </a>
      <a href="#history" class="main-navigation__item ${
  currentFilterType === 'history' ? Classes.MAIN_NAVIGATION_ACTIVE_CLASS : ''
}" data-type="history">
        History
        <span class="main-navigation__item-count">
          ${getFilteredFilmsCount(filters, 'History')}
        </span></a>
      <a href="#favorites" class="main-navigation__item ${
  currentFilterType === 'favorites' ? Classes.MAIN_NAVIGATION_ACTIVE_CLASS : ''
}" data-type="favorites">
        Favorites
        <span class="main-navigation__item-count">
          ${getFilteredFilmsCount(filters, 'Favorites')}
        </span>
      </a>
    </nav>`;

export default class MainNavigationView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createMainNavigationTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.type);
  };
}
