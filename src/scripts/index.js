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
const popupsList = document.querySelectorAll('.popup');

const profileTitle = selector('.profile__title');
const profileDescription = selector('.profile__description');
const profileImage = selector('.profile__image');

const editAvatarModalWindow = selector('.popup_type_edit-avatar');
const editAvatarForm = document.forms['new-avatar'];
const editAvatarLinkInput = editAvatarForm.elements['avatar-link'];
const editAvatarButton = selector('.profile__image-edit-button');

const editProfileModalWindow = selector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const editProfileTitleInput = editProfileForm.elements.name;
const editProfileDescriptionInput = editProfileForm.elements.description;
const editProfileButton = selector('.profile__edit-button');

const createCardModalWindow = selector('.popup_type_new-card');
const createCardForm = document.forms['new-place'];
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
        handleImageClick,
        handleDeleteCard
      );
      placesList.prepend(newCard);
      closeModalWindow(createCardModalWindow);
      createCardForm.reset();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => setButtonLoadingState(event.submitter, false));
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
    })
    .catch((err) => {
      console.error('Ошибка редактирования:', err);
    })
    .finally(() => setButtonLoadingState(event.submitter, false));
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
    })
    .catch((error) => {
      showInputTypeError(editAvatarForm, editAvatarLinkInput, error.message);
      setButtonLoadingState(event.submitter, false);
    })
    .finally(() => setButtonLoadingState(event.submitter, false));
}

function handleImageClick(cardImage) {
  const cardElement = cardImage.closest('.card');
  const cardTitle = cardElement.querySelector('.card__title').textContent;
  popupImage.src = cardImage.src;
  popupImage.alt =
    cardImage.alt && cardImage.alt.trim() !== '' ? cardImage.alt : cardTitle;
  popupImageCaption.textContent = cardTitle;
  openModalWindow(imageModalWindow);
}

if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear().toString();
}

Promise.all([getProfile(), getInitialCards()])
  .then(([user, cards]) => {
    renderUserProfile(user);
    cards.forEach((card) => {
      placesList.append(
        createCard(
          card,
          user,
          cardTemplate,
          handleLikeClick,
          handleImageClick,
          handleDeleteCard
        )
      );
    });
  })
  .catch((error) => {
    console.error('Ошибка при загрузке:', error);
  });

createCardButton.addEventListener('click', () => {
  clearValidation(createCardForm, validationConfig);
  createCardForm.reset();
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
  editAvatarForm.reset();
  openModalWindow(editAvatarModalWindow);
});

popupsList.forEach((popup) => addModalEventListeners(popup));

editProfileForm.addEventListener('submit', handleEditProfileSubmit);
createCardForm.addEventListener('submit', handleCreateCardSubmit);
editAvatarForm.addEventListener('submit', handleEditAvatarSubmit);
deleteCardForm.addEventListener('submit', handleDeleteCardSubmit);

enableValidation(validationConfig);
