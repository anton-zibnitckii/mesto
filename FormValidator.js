export class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._fieldsetSelector = data.fieldsetSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(formInputs) {
    return formInputs.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  _toggleSubmitButtonState(formInputs, formSubmitButton) {
    if (this._hasInvalidInput(formInputs)) {
      formSubmitButton.disabled = true;
      formSubmitButton.classList.add(this._inactiveButtonClass);
    } else {
      formSubmitButton.disabled = false;
      formSubmitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const formInputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const formSubmitButton = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleSubmitButtonState(formInputs, formSubmitButton);

    formInputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState(formInputs, formSubmitButton);
      });
    });
  }


  enableValidation() {
    this._setEventListeners();
  }

}





