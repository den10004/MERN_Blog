
class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;

  }


  getServerCards = () => {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,

    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Произошла ошибка");
      });
  }

  getServerUser = () => {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,

    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Произошла ошибка");
      });

  };

  changeUserUpdate = (name, job) => {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("Произошла ошибка");

      })
  }



















}



