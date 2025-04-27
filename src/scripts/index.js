import '../pages/index.css';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';
import { createCard, handleLikeCard } from './card.js';
import { initialCards } from './cards.js';
import { openModal, addModalEventListeners, closeModal } from './modal.js';


const logoElement = document.querySelector('.logo');
const avatarElement = document.querySelector('.profile__image');
const currentYearElement = document.querySelector('#current-year');

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupEditModal = document.querySelector('.popup_type_edit');
const popupEditProfileForm = document.forms['edit-profile'];
const profileTitleInput = popupEditProfileForm.elements.name;
const profileDescriptionInput = popupEditProfileForm.elements.description;

const popupCreateCardModal = document.querySelector('.popup_type_new-card');
const popupCreateCardForm = document.forms['new-place'];

const popupImageModal = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const editProfileButton = document.querySelector('.profile__edit-button');
const createCardButton = document.querySelector('.profile__add-button');

function handleCreateCardForm(event) {
  event.preventDefault();
  const createCardNameInput = popupCreateCardForm.elements['place-name'].value;
  const createCardLinkInput = popupCreateCardForm.elements.link.value;
  const newCard = createCard(
    { name: createCardNameInput, link: createCardLinkInput },
    cardTemplate,
    handleLikeCard,
    handleImageClick
  );
  placesList.prepend(newCard);
  closeModal(popupCreateCardModal);
  popupCreateCardForm.reset();
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(popupEditModal);
}

export function handleImageClick(cardImage) {
  cardImage.addEventListener('click', () => {
    const cardElement = cardImage.closest('.card');
    const cardTitle = cardElement.querySelector('.card__title').textContent;
    popupImage.src = cardImage.src;
    popupImageCaption.textContent = cardTitle;
    openModal(popupImageModal);
  });
}

logoElement.src = logo;
avatarElement.setAttribute('style', `background-image: url(${avatar})`);

if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear().toString();
}

initialCards.forEach((card) => {
  placesList.append(
    createCard(card, cardTemplate, handleLikeCard, handleImageClick)
  );
});

createCardButton.addEventListener('click', () => {
  openModal(popupCreateCardModal);
});

editProfileButton.addEventListener('click', () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(popupEditModal);
});

addModalEventListeners(popupEditModal);
addModalEventListeners(popupCreateCardModal);
addModalEventListeners(popupImageModal);

popupEditProfileForm.addEventListener('submit', handleEditFormSubmit);
popupCreateCardForm.addEventListener('submit', handleCreateCardForm);