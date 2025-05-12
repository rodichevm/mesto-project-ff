export function handleLikeCard(card) {
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('card__like-button_is-active');
  });
}

export function createCard(
  { name, link, likes, imageDescription = '' },
  cardTemplate,
  likeHandler,
  imageClickHandler
) {
  const cardElement = cardTemplate.querySelector('.card');
  const card = cardElement.cloneNode(true);
  const image = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeCounter = card.querySelector('.card__like-count');
  cardTitle.textContent = name;
  // likeCounter.textContent = likes.length === 0 ? '' : likes.length;
  likeCounter.textContent = likes.length;
  image.src = link;
  image.alt = imageDescription.trim() === '' ? name : imageDescription;
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => removeCard(card));
  likeHandler(card);
  imageClickHandler(image);
  return card;
}

export function removeCard(card) {
  card.remove();
}
