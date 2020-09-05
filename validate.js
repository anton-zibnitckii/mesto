const validationSet = {
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span-error_type_active',
}

function getErrorElement(formElement, inputElement) {
  return formElement.querySelector(`#${inputElement.id}-error`);
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.add(validationSet.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSet.errorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.remove(validationSet.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validationSet.errorClass);
}

function hasInvalidInput(formInputs) {
  return formInputs.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function toggleSubmitButtonState(formInputs, formSubmitButton) {
  if (hasInvalidInput(formInputs)) {
    formSubmitButton.disabled = true;
    formSubmitButton.classList.add(validationSet.inactiveButtonClass);
  } else {
    formSubmitButton.disabled = false;
    formSubmitButton.classList.remove(validationSet.inactiveButtonClass);
  }
}

function inputEventListener(evt) {
  const formElement = evt.target.form;
  const inputElement = evt.srcElement;
  const formInputs = Array.from(formElement.querySelectorAll(validationSet.inputSelector));
  const formSubmitButton = formElement.querySelector(validationSet.submitButtonSelector);
  checkInputValidity(formElement, inputElement);
  toggleSubmitButtonState(formInputs, formSubmitButton);
}

function openCheckValidity(formElement) {
  const formInputs = Array.from(formElement.querySelectorAll(validationSet.inputSelector));
  const formSubmitButton = formElement.querySelector(validationSet.submitButtonSelector);
  formInputs.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  });
  toggleSubmitButtonState(formInputs, formSubmitButton);
};

function setEventListeners(formElement) {
  const formInputs = Array.from(formElement.querySelectorAll(validationSet.inputSelector));
  const formSubmitButton = formElement.querySelector(validationSet.submitButtonSelector);
  toggleSubmitButtonState(formInputs, formSubmitButton);
  formInputs.forEach(inputElement => {
    inputElement.addEventListener('input', inputEventListener);
  })
}

function enableValidation(settingsObject) {
  const formsList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formsList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    const fieldsetList = Array.from(formElement.querySelectorAll(settingsObject.fieldsetSelector));
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset);
    })
  })
}

enableValidation(validationSet);
