import AbstractView from '../framework/view/abstract-view.js';
import { SortType, Classes } from '../constants.js';

const createSortTemplate = (sortType) => {
  const sortByDefaultClassName =
    sortType === SortType.DEFAULT ? Classes.SORT_BUTTON_ACTIVE_CLASS : '';
  const sortByDateClassName = sortType === SortType.DATE ? Classes.SORT_BUTTON_ACTIVE_CLASS : '';
  const sortByRatingClassName =
    sortType === SortType.RATING ? Classes.SORT_BUTTON_ACTIVE_CLASS : '';

  return `
    <ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${sortByDefaultClassName}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button ${sortByDateClassName}">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button ${sortByRatingClassName}">Sort by rating</a></li>
    </ul>`;
};

export default class ShowMoreButtonView extends AbstractView {
  #sortType = SortType.DEFAULT;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createSortTemplate(this.#sortType);
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
