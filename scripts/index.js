const cardTemplate = document.querySelector('#card-template').content;

const cardElement = cardTemplate.querySelector('.card');
const placesList = document.querySelector('.places__list');

function createCard({ name, link, imageDescription }) {
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

const currentYearElement = document.querySelector('#current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear().toString();
}

initialCards.forEach((card) => placesList.append(createCard(card)));