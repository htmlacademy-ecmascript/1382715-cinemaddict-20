import {render} from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';

export default class MoviePresenter {
  #movieContainer = null;

  #filmCard = new FilmCardView();

  constructor({movieContainer}) {
    this.#movieContainer = movieContainer;
  }

  init() {
    render(this.#filmCard, this.#movieContainer);
  }
}
