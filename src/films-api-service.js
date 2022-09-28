import ApiService from './framework/api-service';

import { Method } from './constants.js';

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({ url: 'movies' }).then(ApiService.parseResponse);
  }
}
