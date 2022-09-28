import AbstractView from '../framework/view/abstract-view.js';
import { SortType, Classes } from '../constants.js';

const createSortTemplate = (currentSortType) => {
  const sortByDefaultClassName =
    currentSortType === SortType.DEFAULT ? Classes.SORT_BUTTON_ACTIVE_CLASS : '';
  const sortByDateClassName =
    currentSortType === SortType.DATE ? Classes.SORT_BUTTON_ACTIVE_CLASS : '';
  const sortByRatingClassName =
    currentSortType === SortType.RATING ? Classes.SORT_BUTTON_ACTIVE_CLASS : '';

  return `
    <ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${sortByDefaultClassName}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button ${sortByDateClassName}">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button ${sortByRatingClassName}">Sort by rating</a></li>
    </ul>`;
};

export default class ShowMoreButtonView extends AbstractView {
  #currentSortType = SortType.DEFAULT;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
