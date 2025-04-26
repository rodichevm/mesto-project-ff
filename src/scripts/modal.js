const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};

export const addModalEventListeners = (modal) => {
  const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });

  modal.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
};
