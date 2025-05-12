import '../pages/index.css';
import { createCard, handleLikeClick } from './card.js';
import {
  openModalWindow,
  addModalEventListeners,
  closeModalWindow,
} from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { addCard, editProfile, getInitialCards, getProfile } from './api.js';

const selector = document.querySelector.bind(document);

const currentYearElement = selector('#current-year');

const cardTemplate = selector('#card-template').content;
const placesList = selector('.places__list');

const profileTitle = selector('.profile__title');
const profileDescription = selector('.profile__description');
const profileImage = selector('.profile__image');

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

function renderUserProfile({ name, about, avatar }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileImage.style.backgroundImage = `url(${avatar})`;
}

function handleCreateCardForm(event) {
  event.preventDefault();
  addCard(
    popupCreateCardForm.elements['place-name'].value,
    popupCreateCardForm.elements.link.value
  ).then((card) => {
    const newCard = createCard(
      card,
      card.owner,
      cardTemplate,
      handleLikeClick,
      handleImageClick
    );
    placesList.prepend(newCard);
    closeModalWindow(popupCreateCardModal);
    popupCreateCardForm.reset();
    clearValidation(popupCreateCardForm);
  });
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  editProfile(profileTitleInput.value, profileDescriptionInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((err) => {
      console.error('Ошибка редактирования:', err);
    });
  closeModalWindow(popupEditModal);
}

function handleImageClick(cardImage) {
  cardImage.addEventListener('click', () => {
    const cardElement = cardImage.closest('.card');
    const cardTitle = cardElement.querySelector('.card__title').textContent;
    popupImage.src = cardImage.src;
    popupImage.alt =
      cardImage.alt && cardImage.alt.trim() !== '' ? cardImage.alt : cardTitle;
    popupImageCaption.textContent = cardTitle;
    openModalWindow(popupImageModal);
  });
}

if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear().toString();
}

Promise.all([getProfile(), getInitialCards()])
  .then(([user, cards]) => {
    renderUserProfile(user);
    cards.forEach((card) => {
      placesList.append(
        createCard(card, user, cardTemplate, handleLikeClick, handleImageClick)
      );
    });
  })
  .catch((err) => {
    console.log('Ошибка при загрузке:', err);
  });

createCardButton.addEventListener('click', () => {
  openModalWindow(popupCreateCardModal);
});

editProfileButton.addEventListener('click', () => {
  clearValidation(popupEditProfileForm);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModalWindow(popupEditModal);
});

addModalEventListeners(popupEditModal);
addModalEventListeners(popupCreateCardModal);
addModalEventListeners(popupImageModal);

popupEditProfileForm.addEventListener('submit', handleEditFormSubmit);
popupCreateCardForm.addEventListener('submit', handleCreateCardForm);

enableValidation();
