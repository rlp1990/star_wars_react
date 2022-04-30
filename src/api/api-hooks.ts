import { Params } from './types';

export default class Connection {
  private baseUrl = "https://swapi.dev/api/";
  private doGetParams: string = '';

  public setDoGetParams(params: Params): void {
      let doGetParams: string = '?';
    for (let key in params) {
        doGetParams += `${key}=${params[key]}&`;
    }
    doGetParams += '&';
    this.doGetParams = doGetParams.replace('&&', '');
  }

  public doGet(url: string, resolve: Function, reject: Function): void {
    const promise = new Promise((resolve, reject) => {
      fetch(this.baseUrl + url + this.doGetParams)
        .then((res) => res.json())
        .then(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
    promise.then(response => {
        resolve(response);
    });
    promise.catch(error => {
        reject(error);
    });
  };
}
