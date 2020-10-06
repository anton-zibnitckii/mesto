import { imagePopup, captionPopup } from './index.js'

export class Card {
  constructor(name, url) {
    this._name = name;
    this._url = url;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#card-template').content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._url;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').dataset.name = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', this._handleCardLike);
    this._element.querySelector('.card__delete-button').addEventListener('click', this._handleCardDelete);
    this._element.querySelector('.card__popup-button').addEventListener('click', this._handleCardClick);
  }

  _handleCardLike = evt => {evt.target.classList.toggle('card__like-button_event')}

  _handleCardDelete = evt => {evt.target.closest('.card').remove()}

  _handleCardClick() {
    this._url = imagePopup.src;
    this._name = imagePopup.alt;
    this._name = captionPopup.textContent;
    openPopup(popupBig);
  }

}
