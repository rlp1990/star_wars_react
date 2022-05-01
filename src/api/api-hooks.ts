import { Params } from "./types";

export default class Connection {
  /**
   * Base URL endpoint: *Should be defined in environment
   */
  private baseUrl: string = "https://swapi.dev/api/";

  /**
   * Params path to add at the end of the GET request
   */
  private doGetParams: string = "";

  /**
   * @public Method to set params for GET request (if required - optional)
   * @param {Params} params Data object to send in the GET request
   */
  public setDoGetParams(params: Params): void {
    let doGetParams: string = "?";
    for (let key in params) {
      doGetParams += `${key}=${params[key]}&`;
    }
    doGetParams += "&";
    this.doGetParams = doGetParams.replace("&&", "");
  }

  /**
   * Method to make GET request and fetch data as Promise
   * @param {String} url Endpoint path to make the request
   * @param {Function} resolve Callback to handle the Promise response (optional)
   * @param {Function} reject Callback to handle the Promise error (optional)
   * @returns {Promise<T>} Generic type Promise response
   */
  public doGet<T>(
    url: string,
    resolve?: Function,
    reject?: Function
  ): Promise<T> {
    const promise = new Promise<T>((resolve, reject) => {
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

    if (resolve) {
      promise.then((response) => {
        resolve(response);
      });
    }

    if (reject) {
      promise.catch((error) => {
        reject(error);
      });
    }
    return promise;
  }
}
