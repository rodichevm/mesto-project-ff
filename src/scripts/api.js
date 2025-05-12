const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  cardsUrl: '/cards',
  usersUrl: '/users',
  headers: {
    authorization: '51a21100-cb43-4102-be63-22dae278b0b1',
    'Content-Type': 'application/json',
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}${config.cardsUrl}`, {
    method: 'GET',
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.statusText}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProfile = () => {
  return fetch(`${config.baseUrl}${config.usersUrl}/me`, {
    method: 'GET',
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
};

export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}${config.usersUrl}/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
};

export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}${config.cardsUrl}`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((respone) => {
    if (respone.ok) {
      return respone.json();
    }
  });
};
