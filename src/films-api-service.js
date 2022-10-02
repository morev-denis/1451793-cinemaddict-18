import ApiService from './framework/api-service.js';
import { Method } from './constants.js';
import { adaptToServer } from './adapter/adapt-to-server.js';

export default class FilmsApiService extends ApiService {
  #adaptToServer = null;

  get films() {
    return this._load({ url: 'movies' }).then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    this.#adaptToServer = adaptToServer;

    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}
