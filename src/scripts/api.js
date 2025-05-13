const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  cardsUrl: '/cards',
  usersUrl: '/users',
  meUrl: '/me',
  likesUrl: '/likes',
  avatarUrl: '/avatar',
  headers: {
    authorization: '51a21100-cb43-4102-be63-22dae278b0b1',
    'Content-Type': 'application/json',
  },
};

function handleResponse(response, customMessage) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject({
    response: response,
    message: customMessage || 'Ошибка при получении данных',
  });
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}${config.cardsUrl}`, {
    method: 'GET',
    headers: config.headers,
  }).then((response) =>
    handleResponse(response, 'Ошибка при получении карточек')
  );
};

export const getProfile = () => {
  return fetch(`${config.baseUrl}${config.usersUrl}${config.meUrl}`, {
    method: 'GET',
    headers: config.headers,
  }).then((response) =>
    handleResponse(response, 'Ошибка при получении информации профиля')
  );
};

export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}${config.usersUrl}${config.meUrl}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((response) =>
    handleResponse(response, 'Ошибка при редактировании информации профиля')
  );
};

export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}${config.cardsUrl}`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((response) =>
    handleResponse(response, 'Ошибка при добавлении карточки')
  );
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}${config.cardsUrl}/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((response) =>
    handleResponse(response, 'Ошибка при удалении карточки')
  );
};

export const likeCard = (cardId) => {
  return fetch(
    `${config.baseUrl}${config.cardsUrl}${config.likesUrl}/${cardId}`,
    {
      method: 'PUT',
      headers: config.headers,
    }
  ).then((response) => handleResponse(response, 'Ошибка добавления лайка'));
};

export const unLikeCard = (cardId) => {
  return fetch(
    `${config.baseUrl}${config.cardsUrl}${config.likesUrl}/${cardId}`,
    {
      method: 'DELETE',
      headers: config.headers,
    }
  ).then((response) => handleResponse(response, 'Ошибка при удаления лайка'));
};

export const editProfileImage = (url) => {
  return fetch(
    `${config.baseUrl}${config.usersUrl}${config.meUrl}${config.avatarUrl}`,
    {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }
  ).then((response) =>
    handleResponse(response, 'Ошибка редактирования аватара')
  );
};

export const checkUrlImage = (url) => {
  return fetch(url, {
    method: 'HEAD',
  }).then((response) => {
    const contentType = response.headers.get('Content-Type');
    const isImage = contentType === 'image/jpeg' || contentType === 'image/png';
    if (response.ok && isImage) {
      return true;
    }
    return Promise.reject({
      message: 'Ссылка недействительна или не является изображением.',
      status: response.status,
    });
  });
};
