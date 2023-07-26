import {remove, render} from '../framework/render.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import UserView from '../view/user-view.js';
import MoviePresenter from './movie-presenter.js';
import SortView from '../view/sort-view.js';
import NavigationView from '../view/navigation-view.js';
import FilmsListView from '../view/films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';

const MOVIE_COUNT_PER_STEP = 5;
export default class MovieListPresenter {
  #moviesHeaderContainer = null;
  #moviesMainContainer = null;
  #moviesFooterStatisticsContainer = null;

  #showMoreButtonComponnet = null;

  #footerStatistics = new FooterStatisticsView();
  #user = new UserView();
  #navigation = new NavigationView();
  #sort = new SortView();
  #movieList = new FilmsListView();
  #movieListEmpty = new FilmListEmptyView();

  #moviePresenter = null;

  #movies = [];
  #renderMoviesCount = MOVIE_COUNT_PER_STEP;
  constructor({moviesHeaderContainer, moviesMainContainer, moviesFooterStatisticsContainer, movies}) {
    this.#moviesHeaderContainer = moviesHeaderContainer;
    this.#moviesMainContainer = moviesMainContainer;
    this.#moviesFooterStatisticsContainer = moviesFooterStatisticsContainer;
    this.#movies = movies;
  }

  init() {
    render(this.#user, this.#moviesHeaderContainer);
    render(this.#navigation, this.#moviesMainContainer);
    render(this.#sort, this.#moviesMainContainer);

    this.#renderMovieList(this.#movies);
    this.#renderShowMoreButton();
    render(this.#footerStatistics, this.#moviesFooterStatisticsContainer);
  }

  #renderMovieList(movieList) {
    if(!movieList.length) {
      this.#renderMovieListEmpty();
    } else {
      render(this.#movieList, this.#moviesMainContainer);

      for(let i = 0; i < Math.min(movieList.length, MOVIE_COUNT_PER_STEP); i++) {
        this.#renderMovieCard(movieList[i]);
      }
    }
  }

  #renderMovieCard(movie) {
    this.#moviePresenter = new MoviePresenter({
      movieContainer: this.#movieList.getFilmCardContainer()
    });

    this.#moviePresenter.init(movie);
  }

  #renderMovieListEmpty() {
    render(this.#movieListEmpty, this.#moviesMainContainer);
  }

  #renderShowMoreButton() {
    if(this.#movies.length > MOVIE_COUNT_PER_STEP) {
      this.#showMoreButtonComponnet = new ShowMoreButtonView({
        onClick: this.#handleShowMoreButtonClick
      });
      render(this.#showMoreButtonComponnet, this.#movieList.element);
    }
  }

  #handleShowMoreButtonClick = () => {
    const moviesCount = this.#movies.length;
    const newRenderMoviesCount = Math.min(moviesCount, this.#renderMoviesCount + MOVIE_COUNT_PER_STEP);
    const movies = this.#movies.slice(this.#renderMoviesCount, newRenderMoviesCount);

    this.#renderMovieList(movies);
    this.#renderMoviesCount = newRenderMoviesCount;

    if(this.#renderMoviesCount >= moviesCount) {
      remove(this.#showMoreButtonComponnet);
    }
  };
}
