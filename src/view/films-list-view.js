import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListContainerTemplate = () =>
  `<section class="films-list">
  </section>`;

export default class FilmsListContainerView extends AbstractView {
  get template() {
    return createFilmsListContainerTemplate();
  }
}
