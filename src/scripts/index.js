import '../pages/index.css';
import { createCard } from './card.js';
import { initialCards } from './cards.js';
import { openModal, addModalEventListeners } from './modal.js';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';

const logoElement = document.querySelector('.logo');
const avatarElement = document.querySelector('.profile__image');
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const currentYearElement = document.querySelector('#current-year');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupEditModal = document.querySelector('.popup_type_edit');
const popupEditForm = document.forms['edit-profile'];

const popupNewCardModal = document.querySelector('.popup_type_new-card');

const popupImageModal = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

logoElement.src = logo;
avatarElement.setAttribute('style', `background-image: url(${avatar})`);

if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear().toString();
}

initialCards.forEach((card) => {
  placesList.append(createCard(card, cardTemplate));
});

editButton.addEventListener('click', () => {
  const profileNameInput = popupEditForm.elements.name;
  const profileDescriptionInput = popupEditForm.elements.description;
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(popupEditModal);
});

addButton.addEventListener('click', () => {
  openModal(popupNewCardModal);
});

placesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('card__image')) {
    const cardElement = event.target.closest('.card');
    const cardTitle = cardElement.querySelector('.card__title').textContent;
    console.log(cardTitle);
    popupImage.src = event.target.src;
    popupImageCaption.textContent = cardTitle;
    openModal(popupImageModal);
  }
});

addModalEventListeners(popupEditModal);
addModalEventListeners(popupNewCardModal);
addModalEventListeners(popupImageModal);
