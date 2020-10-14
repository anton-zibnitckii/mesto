export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      };
    }

    this._handleOverlayClick = (evt) => {
      if (evt.target.classList.contains('popup_open')) {
        this.close();
      };
    }

  }

  open() {
    this._popupSelector.classList.add('popup_open');
    this.setEventListeners();
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClick);
  }

  close() {
    this._popupSelector.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClick);
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => this.close());

  }
}
