export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const showInputTypeError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

export const hideInputTypeError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.valueMissing) {
    const errorMessage = 'Вы пропустили это поле';
    showInputTypeError(formElement, inputElement, errorMessage);
  } else if (inputElement.validity.patternMismatch) {
    const errorMessage = inputElement.dataset.errorMessage || 'Неверный формат';
    showInputTypeError(formElement, inputElement, errorMessage);
  } else if (inputElement.validity.typeMismatch) {
    const errorMessage =
      inputElement.dataset.errorMessage || 'Неверный тип данных';
    showInputTypeError(formElement, inputElement, errorMessage);
  } else if (inputElement.validity.customError) {
    const errorMessage =
      inputElement.validationMessage || 'Ошибка при заполнении';
    showInputTypeError(formElement, inputElement, errorMessage);
  } else {
    hideInputTypeError(formElement, inputElement);
    inputElement.setCustomValidity('');
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`${validationConfig.inputSelector}`)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

export const clearValidation = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`${validationConfig.inputSelector}`)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputTypeError(formElement, inputElement);
    inputElement.setCustomValidity('');
  });
  toggleButtonState(inputList, buttonElement);
};
