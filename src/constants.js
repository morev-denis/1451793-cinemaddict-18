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
};

const FilmsListTitleText = {
  MAIN_TITLE: 'All movies. Upcoming',
  EMPTY_LIST: 'There are no movies in our database',
  EMPTY_WATCHLIST: 'There are no movies to watch now',
  EMPTY_HISTORY: 'There are no watched movies now',
  EMPTY_FAVORITES: 'There are no favorite movies now',
};

const CommentMockData = {
  AUTHORS: ['Doctor Eggman', 'Hello Kitty', 'Nanako Dojima', 'Relm Arrowny'],

  COMMENTS: [
    'The movie started out pretty innocently, and for the first 20 minutes, I was wondering where the movie was going.',
    'I have only ever seen this film once, I only ever want to see this film once and I will only ever need to see this film once.',
    'Ive seen this film one time in 1994. This is one of the best movies ever made, but many scenes of the film are so brutal, that Im afraid to see this film for a second time.',
    'This is probably the most important movie of director Steven Spielbergs career.',
  ],
  DATES: [
    '1999-01-19T10:14:30.576Z',
    '2020-11-09T12:03:00.526Z',
    '2021-12-29T22:04:01.573Z',
    '2022-05-01T23:54:59.776Z',
    '2000-04-18T01:59:11.556Z',
  ],

  EMOTIONS: ['smile', 'sleeping', 'puke', 'angry'],
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
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const AUTHORIZATION = 'Basic Jd3ekS36qot8nf5v';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict/';

export {
  FILM_COUNT_PER_STEP,
  MOST_COMMENTED_FILM_COUNT,
  TOP_RATED_FILM_COUNT,
  Classes,
  Selectors,
  CommentMockData,
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
};
