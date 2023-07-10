import {render} from '../framework/render.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import UserView from '../view/user-view.js';
import MoviePresenter from './movie-presenter.js';
import SortView from '../view/sort-view.js';
import NavigationView from '../view/navigation-view.js';
import FilmsListView from '../view/films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class MovieListPresenter {
  #moviesHeaderContainer = null;
  #moviesMainContainer = null;
  #moviesFooterStatisticsContainer = null;

  #footerStatistics = new FooterStatisticsView();
  #user = new UserView();
  #navigation = new NavigationView();
  #sort = new SortView();
  #movieList = new FilmsListView();
  #showMore = new ShowMoreButtonView();

  #moviePresenter = null;

  constructor({moviesHeaderContainer, moviesMainContainer, moviesFooterStatisticsContainer}) {
    this.#moviesHeaderContainer = moviesHeaderContainer;
    this.#moviesMainContainer = moviesMainContainer;
    this.#moviesFooterStatisticsContainer = moviesFooterStatisticsContainer;
  }

  init() {
    render(this.#user, this.#moviesHeaderContainer);
    render(this.#navigation, this.#moviesMainContainer);
    render(this.#sort, this.#moviesMainContainer);
    render(this.#movieList, this.#moviesMainContainer);

    for(let i = 0; i < 5; i++) {
      this.#moviePresenter = new MoviePresenter({
        movieContainer: this.#movieList.element.querySelector('.films-list__container')
      });
      this.#moviePresenter.init();
    }
    render(this.#showMore, this.#movieList.element);
    render(this.#footerStatistics, this.#moviesFooterStatisticsContainer);
  }
}
