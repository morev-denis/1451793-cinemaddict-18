const FILM_COUNT_PER_STEP = 5;
const MOST_COMMENTED_FILM_COUNT = 2;
const TOP_RATED_FILM_COUNT = 2;

const DescriptionLength = {
  MIN: 0,
  MAX: 140,
};

const Classes = {
  VISUALLY_HIDDEN_CLASS: 'visually-hidden',
  HIDE_OVERFLOW_CLASS: 'hide-overflow',
  CONTROL_BUTTON_ACTIVE_CLASS: 'film-card__controls-item--active',
  POPUP_CONTROL_BUTTON_ACTIVE_CLASS: 'film-details__control-button--active',
  SORT_BUTTON_ACTIVE_CLASS: 'sort__button--active',
  MAIN_NAVIGATION_ACTIVE_CLASS: 'main-navigation__item--active',
};

const Selectors = {
  FILM_CARD_LINK_SELECTOR: '.film-card__link',
  FOOTER_STATISTICS: '.footer__statistics',
  FILM_DETAILS_CLOSE_BTN: '.film-details__close-btn',
  ADD_TO_WATCHLIST_BTN: '.film-card__controls-item--add-to-watchlist',
  MARK_AS_WATCHED_BTN: '.film-card__controls-item--mark-as-watched',
  ADD_TO_FAVORITE_BTN: '.film-card__controls-item--favorite',
  POPUP_ADD_TO_WATCHLIST_BTN: '.film-details__control-button--watchlist',
  POPUP_MARK_AS_WATCHED_BTN: '.film-details__control-button--watched',
  POPUP_ADD_TO_FAVORITE_BTN: '.film-details__control-button--favorite',
  FILM_DETAILS_COMMENTS_LIST: '.film-details__comments-list',
  FILM_DETAILS_EMOJI_LIST: '.film-details__emoji-list',
  FILM_DETAILS_COMMENT_INPUT: '.film-details__comment-input',
  FILM_DETAILS_COMMENT_DELETE: '.film-details__comment-delete',
  FILM_DETAILS_INFO_WRAP: '.film-details__info-wrap',
  FILM_DETAILS_COMMENTS_WRAP: '.film-details__comments-wrap',
  FILM_DETAILS_COMMENTS_TITLE: '.film-details__comments-title',
};

const FilmsListTitleText = {
  MAIN_TITLE: 'All movies. Upcoming',
  EMPTY_LIST: 'There are no movies in our database',
  EMPTY_WATCHLIST: 'There are no movies to watch now',
  EMPTY_HISTORY: 'There are no watched movies now',
  EMPTY_FAVORITES: 'There are no favorite movies now',
};

const Mode = {
  DEFAULT: 'default',
  POPUP: 'popup',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  UPDATE_FILM_DETAILS: 'UPDATE_FILM_DETAILS',
  DELETE_COMMENT: 'DELETE_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const AUTHORIZATION = 'Basic Jd3ekS36qot8nf5v';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict/';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const Rank = {
  WITHOUT_RANK: '',
  NOVICE: 'novice',
  FAN: 'fan',
  MOVIE_BUFF: 'movie buff',
};

export {
  FILM_COUNT_PER_STEP,
  MOST_COMMENTED_FILM_COUNT,
  TOP_RATED_FILM_COUNT,
  Classes,
  Selectors,
  DescriptionLength,
  FilmsListTitleText,
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  Mode,
  Method,
  AUTHORIZATION,
  END_POINT,
  TimeLimit,
  Rank,
};
