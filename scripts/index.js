const cardTemplate = document.querySelector('#card-template').content;

const cardElement = cardTemplate.querySelector('.card');
const placesList = document.querySelector('.places__list');

function createCard(item) {
    const card = cardElement.cloneNode(true);
    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__title').textContent = item.name;
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => removeCard(card));
    return card;
}

function removeCard(card) {
    card.remove();
}

initialCards.forEach(card => placesList.append(createCard(card)));