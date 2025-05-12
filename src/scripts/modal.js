const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModalWindow(popup);
  }
};

export const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};

export const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

export const addModalEventListeners = (modalWindow) => {
  const closeButton = modalWindow.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModalWindow(modalWindow);
  });

  modalWindow.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closeModalWindow(modalWindow);
    }
  });
};
