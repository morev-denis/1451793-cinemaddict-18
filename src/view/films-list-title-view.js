import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListTitleTemplate = (text) => `<h2 class="films-list__title">${text}</h2>`;

export default class FilmsListContainerView extends AbstractView {
  #text = '';

  constructor(text) {
    super();
    this.#text = text;
  }

  get template() {
    return createFilmsListTitleTemplate(this.#text);
  }
}
