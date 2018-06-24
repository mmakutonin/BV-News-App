export default class {
  static XHR(url, method, params) {
    return fetch(url, {
      body: JSON.stringify(params), // must match 'Content-Type' header
      headers: {
        'content-type': 'application/json',
      },
      method: method, // *GET, PUT, DELETE, etc.
      mode: 'cors',
    }).then(response => response.json());
  }

  static get(url) {
    return this.XHR(url, 'GET');
  }
}
