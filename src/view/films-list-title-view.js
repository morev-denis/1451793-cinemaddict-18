import AbstractView from '../framework/view/abstract-view.js';
import { FilterType, FilmsListTitleText } from '../constants.js';

const filmsListTitle = {
  [FilterType.ALL]: FilmsListTitleText.MAIN_TITLE,
  [FilterType.WATCHLIST]: FilmsListTitleText.EMPTY_WATCHLIST,
  [FilterType.HISTORY]: FilmsListTitleText.EMPTY_HISTORY,
  [FilterType.FAVORITES]: FilmsListTitleText.EMPTY_FAVORITES,
};

const createFilmsListTitleTemplate = (filterType) => {
  const filmsListTitleValue = filmsListTitle[filterType];

  return `
    <h2 class="films-list__title">${filmsListTitleValue}</h2>`;
};

export default class FilmsListTitleView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createFilmsListTitleTemplate(this.#filterType);
  }
}
