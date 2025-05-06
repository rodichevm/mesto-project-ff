const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};

export const openModal = (modalWindow) => {
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};

export const closeModal = (modalWindow) => {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

export const addModalEventListeners = (modalWindow) => {
  const closeButton = modalWindow.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(modalWindow);
  });

  modalWindow.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closeModal(modalWindow);
    }
  });
};
