import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popupSelector ) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this.popupSelector.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  open() {
    super.open();
  }

  close() {
    this._popupSelector.querySelector('.popup__form').reset();
    super.close();
  }

  cleanError() {
    this._popupSelector.querySelectorAll('.popup__span-error').forEach((span) => {
      span.classList.remove('popup__span-error_type_active');
      span.textContent = '';
    });

    this._popupSelector.querySelectorAll('.popup__input').forEach((input) => {
      input.classList.remove('popup__input_type_error');
    });

    this._popupSelector.querySelectorAll('.popup__save-button').forEach((btn) => {
      btn.classList.add('popup__save-button_type_disabled');
    })
  }
}
