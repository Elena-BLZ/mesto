class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
      .then(
        res => {
          if (res.ok)
            return res.json();
          return Promise.reject(res.status);
        }
      )
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
      .then(
        res => {
          if (res.ok)
            return res.json();
          return Promise.reject(res.status);
        }
      )
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(
        res => {
          if (res.ok)
            return res.json();
          return Promise.reject(res.status);
        }
      )
  }

  editAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(
        res => {
          if (res.ok)
            return res.json();
          return Promise.reject(res.status);
        }
      )
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(
        res => {
          if (res.ok)
            return res.json();
          return Promise.reject(res.status);
        }
      )
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(
        res => {
          if (res.ok)
            return res.json();
          return Promise.reject(res.status);
        }
      )
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(
        res => {
          if (res.ok)
            return res.json();
          return Promise.reject(res.status);
        }
      )
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(
        res => {
          if (res.ok)
            return res.json();
          return Promise.reject(res.status);
        }
      )
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '096c9daf-5b1c-45f9-99ae-8b68bf1398d4',
    'Content-Type': 'application/json'
  }
});
