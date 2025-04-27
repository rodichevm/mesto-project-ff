function createCard({ name, link, imageDescription = '' }, cardTemplate) {
  const cardElement = cardTemplate.querySelector('.card');
  const card = cardElement.cloneNode(true);
  const image = card.querySelector('.card__image');
  image.src = link;
  image.alt = imageDescription;
  card.querySelector('.card__title').textContent = name;
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => removeCard(card));
  return card;
}

function removeCard(card) {
  card.remove();
}

export { createCard };
