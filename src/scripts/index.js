import '../pages/index.css';
import { createCard, handleLikeCard } from './card.js';
import { initialCards } from './cards.js';
import { openModal, addModalEventListeners, closeModal } from './modal.js';

const selector = document.querySelector.bind(document);

const currentYearElement = selector('#current-year');

const cardTemplate = selector('#card-template').content;
const placesList = selector('.places__list');

const profileTitle = selector('.profile__title');
const profileDescription = selector('.profile__description');

const popupEditModal = selector('.popup_type_edit');
const popupEditProfileForm = document.forms['edit-profile'];
const profileTitleInput = popupEditProfileForm.elements.name;
const profileDescriptionInput = popupEditProfileForm.elements.description;

const popupCreateCardModal = selector('.popup_type_new-card');
const popupCreateCardForm = document.forms['new-place'];

const popupImageModal = selector('.popup_type_image');
const popupImage = selector('.popup__image');
const popupImageCaption = selector('.popup__caption');

const editProfileButton = selector('.profile__edit-button');
const createCardButton = selector('.profile__add-button');

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

function handleImageClick(cardImage) {
  cardImage.addEventListener('click', () => {
    const cardElement = cardImage.closest('.card');
    const cardTitle = cardElement.querySelector('.card__title').textContent;
    popupImage.src = cardImage.src;
    popupImage.alt =
      cardImage.alt && cardImage.alt.trim() !== '' ? cardImage.alt : cardTitle;
    popupImageCaption.textContent = cardTitle;
    openModal(popupImageModal);
  });
}

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
