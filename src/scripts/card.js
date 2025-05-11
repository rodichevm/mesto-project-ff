export function handleLikeCard(card) {
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('card__like-button_is-active');
  });
}

export function createCard(
  { name, link, imageDescription = '' },
  cardTemplate,
  likeHandler,
  imageClickHandler
) {
  const cardElement = cardTemplate.querySelector('.card');
  const card = cardElement.cloneNode(true);
  const image = card.querySelector('.card__image');
  image.src = link;
  image.alt = imageDescription.trim() === '' ? name : imageDescription;
  card.querySelector('.card__title').textContent = name;
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => removeCard(card));
  likeHandler(card);
  imageClickHandler(image);
  return card;
}

export function removeCard(card) {
  card.remove();
}
