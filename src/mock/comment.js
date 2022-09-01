import { CommentMockData } from '../constants.js';

import { getRandomItem } from '../utils/common.js';

export const generateComment = () => ({
  author: getRandomItem(CommentMockData.AUTHORS),
  comment: getRandomItem(CommentMockData.COMMENTS),
  date: getRandomItem(CommentMockData.DATES),
  emotion: getRandomItem(CommentMockData.EMOTIONS),
});
