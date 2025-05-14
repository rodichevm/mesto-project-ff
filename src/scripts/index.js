import '../pages/index.css';
import { createCard, handleLikeClick } from './card.js';
import {
  openModalWindow,
  addModalEventListeners,
  closeModalWindow,
} from './modal.js';
import {
  enableValidation,
  clearValidation,
  showInputTypeError,
} from './validation.js';
import {
  addCard,
  checkUrlImage,
  deleteCard,
  editProfile,
  editProfileImage,
  getInitialCards,
  getProfile,
} from './api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const selector = document.querySelector.bind(document);
const currentYearElement = selector('#current-year');

const cardTemplate = selector('#card-template').content;
const placesList = selector('.places__list');

const profileTitle = selector('.profile__title');
const profileDescription = selector('.profile__description');
const profileImage = selector('.profile__image');

const editAvatarModalWindow = selector('.popup_type_edit-avatar');
const editAvatarForm = document.forms['new-avatar'];
const editAvatarButton = selector('.profile__image-edit-button');
const editAvatarLinkInput = editAvatarForm.elements['avatar-link'];

const editProfileModalWindow = selector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const editProfileButton = selector('.profile__edit-button');
const editProfileTitleInput = editProfileForm.elements.name;
const editProfileDescriptionInput = editProfileForm.elements.description;

const createCardModalWindow = selector('.popup_type_new-card');
const createCardForm = document.forms['new-place'];
const createCardNameInput = createCardForm.elements['place-name'];
const createCardLinkInput = createCardForm.elements.link;
const createCardButton = selector('.profile__add-button');

const deleteCardModalWindow = selector('.popup_type_delete_card');
const deleteCardForm = document.forms['delete-card-popup'];

const imageModalWindow = selector('.popup_type_image');
const popupImage = selector('.popup__image');
const popupImageCaption = selector('.popup__caption');

let cardForDelete = {};

export function handleDeleteCard(cardId, cardElement) {
  cardForDelete = {
    id: cardId,
    cardElement,
  };
  openModalWindow(deleteCardModalWindow);
}

function renderUserProfile({ name, about, avatar }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileImage.style.backgroundImage = `url(${avatar})`;
}

function setButtonLoadingState(
  button,
  isLoading,
  loadingText = 'Cохранение...',
  defaultText = 'Cохранить'
) {
  button.textContent = isLoading ? loadingText : defaultText;
}

function handleCreateCardSubmit(event) {
  event.preventDefault();
  setButtonLoadingState(event.submitter, true);
  addCard(
    createCardForm.elements['place-name'].value,
    createCardForm.elements.link.value
  )
    .then((card) => {
      const newCard = createCard(
        card,
        card.owner,
        cardTemplate,
        handleLikeClick,
        handleImageClick
      );
      placesList.prepend(newCard);
      closeModalWindow(createCardModalWindow);
      setTimeout(() => {
        setButtonLoadingState(event.submitter, false);
      }, 400);
      createCardForm.reset();
      clearValidation(createCardForm, validationConfig);
    })
    .catch((error) => {
      console.error(error);
    });
}

const handleDeleteCardSubmit = (event) => {
  event.preventDefault();
  if (!cardForDelete.cardElement) return;
  deleteCard(cardForDelete.id)
    .then(() => {
      cardForDelete.cardElement.remove();
      closeModalWindow(deleteCardModalWindow);
      cardForDelete = {};
    })
    .catch((error) => console.error(error));
};

function handleEditProfileSubmit(event) {
  event.preventDefault();
  setButtonLoadingState(event.submitter, true);
  editProfile(editProfileTitleInput.value, editProfileDescriptionInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .then(() => {
      closeModalWindow(editProfileModalWindow);
      setTimeout(() => {
        setButtonLoadingState(event.submitter, false);
      }, 400);
    })
    .catch((err) => {
      console.error('Ошибка редактирования:', err);
    });
}

function handleEditAvatarSubmit(event) {
  event.preventDefault();
  setButtonLoadingState(event.submitter, true);
  checkUrlImage(editAvatarLinkInput.value)
    .then(() => {
      return editProfileImage(editAvatarLinkInput.value);
    })
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModalWindow(editAvatarModalWindow);
      setTimeout(() => {
        setButtonLoadingState(event.submitter, false);
      }, 400);
    })
    .catch((error) => {
      showInputTypeError(editAvatarForm, editAvatarLinkInput, error.message);
      setButtonLoadingState(event.submitter, false);
    });
}

function handleImageClick(cardImage) {
  cardImage.addEventListener('click', () => {
    const cardElement = cardImage.closest('.card');
    const cardTitle = cardElement.querySelector('.card__title').textContent;
    popupImage.src = cardImage.src;
    popupImage.alt =
      cardImage.alt && cardImage.alt.trim() !== '' ? cardImage.alt : cardTitle;
    popupImageCaption.textContent = cardTitle;
    openModalWindow(imageModalWindow);
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
  .catch((error) => {
    console.error('Ошибка при загрузке:', error);
  });

createCardButton.addEventListener('click', () => {
  clearValidation(createCardForm, validationConfig);
  createCardNameInput.value = '';
  createCardLinkInput.value = '';
  openModalWindow(createCardModalWindow);
});

editProfileButton.addEventListener('click', () => {
  clearValidation(editProfileForm, validationConfig);
  editProfileTitleInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  openModalWindow(editProfileModalWindow);
});

editAvatarButton.addEventListener('click', () => {
  clearValidation(editAvatarForm, validationConfig);
  editAvatarLinkInput.value = '';
  openModalWindow(editAvatarModalWindow);
});

addModalEventListeners(editProfileModalWindow);
addModalEventListeners(createCardModalWindow);
addModalEventListeners(imageModalWindow);
addModalEventListeners(editAvatarModalWindow);
addModalEventListeners(deleteCardModalWindow);

editProfileForm.addEventListener('submit', handleEditProfileSubmit);
createCardForm.addEventListener('submit', handleCreateCardSubmit);
editAvatarForm.addEventListener('submit', handleEditAvatarSubmit);
deleteCardForm.addEventListener('submit', handleDeleteCardSubmit);

enableValidation(validationConfig);
