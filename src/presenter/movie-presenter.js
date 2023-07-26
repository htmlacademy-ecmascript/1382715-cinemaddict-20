import {render} from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';

export default class MoviePresenter {
  #movieContainer = null;

  #filmCard = null;

  constructor({movieContainer}) {
    this.#movieContainer = movieContainer;
  }

  init(movie) {
    this.#filmCard = new FilmCardView({
      movie: movie
    });

    render(this.#filmCard, this.#movieContainer);
  }
}
