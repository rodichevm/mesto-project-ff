import { likeCard, unLikeCard } from './api.js';

export function handleLikeClick(card, cardId, likeCounter) {
  const likeButton = card.querySelector('.card__like-button');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    unLikeCard(cardId)
      .then((card) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = card.likes.length;
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    likeCard(cardId)
      .then((card) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = card.likes.length;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function createCard(
  { name, link, likes, _id, owner },
  user,
  cardTemplate,
  likeClickHandler,
  imageClickHandler,
  deleteCardHandler
) {
  const cardElement = cardTemplate.querySelector('.card');
  const card = cardElement.cloneNode(true);
  const image = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeCounter = card.querySelector('.card__like-count');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  cardTitle.textContent = name;
  likeCounter.textContent = likes.length;
  image.src = link;
  image.alt = name;
  if (owner._id === user._id) {
    deleteButton.classList.add('card__delete-button_is-visible');
    deleteButton.addEventListener('click', () => {
      deleteCardHandler(_id, card);
    });
  }
  const isLiked = likes.some((like) => like._id === user._id);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', () => {
    likeClickHandler(card, _id, likeCounter);
  });
  imageClickHandler(image);
  return card;
}
