import { Method } from './constants.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {
  getComments = async (filmId) =>
    this._load({ url: `comments/${filmId}` }).then(ApiService.parseResponse);

  deleteComment = async (commentId) => {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });

    return response;
  };

  addComment = async (comment, filmId) => {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}
