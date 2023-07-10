import MovieListPresenter from './presenter/movie-list-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const movieListPresenter = new MovieListPresenter({
  moviesHeaderContainer: siteHeaderElement,
  moviesMainContainer: siteMainElement,
  moviesFooterStatisticsContainer: siteFooterStatisticsElement,
});

movieListPresenter.init();
