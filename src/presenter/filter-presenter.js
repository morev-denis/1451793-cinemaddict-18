import { UpdateType, FilterType } from '../constants.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import MainNavigationView from '../view/main-navigation-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #mainNavigationComponent = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        type: FilterType.ALL,
        name: 'All',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevMainNavigationComponent = this.#mainNavigationComponent;

    this.#mainNavigationComponent = new MainNavigationView(filters, this.#filterModel.filter);
    this.#mainNavigationComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevMainNavigationComponent === null) {
      render(this.#mainNavigationComponent, this.#filterContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#mainNavigationComponent, prevMainNavigationComponent);
    remove(prevMainNavigationComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
