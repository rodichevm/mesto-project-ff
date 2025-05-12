import { deleteCard } from './api';

export function handleLikeClick(card) {
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('card__like-button_is-active');
  });
}

export function createCard(
  { name, link, likes, _id, owner },
  user,
  cardTemplate,
  likeClickHandler,
  imageClickHandler
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
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', () => {
      deleteCard(_id).then(() => {
        removeCard(card);
      });
    });
  }
  const isLiked = likes.some((like) => like._id === user._id);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeClickHandler(card);
  imageClickHandler(image);
  return card;
}

export function removeCard(card) {
  card.remove();
}
