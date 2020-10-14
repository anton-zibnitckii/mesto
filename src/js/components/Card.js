export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  // _handleCardClick(evt) {
  //   const _imagePopup = document.querySelector('.popup-view__img');
  //   const _captionPopup = document.querySelector('.popup-view__caption');
  //   const item = evt.target;
  //   _imagePopup.src = item.src;
  //   _imagePopup.dataset.name = item.dataset.name;
  //   _captionPopup.textContent = item.dataset.name;
  //   openPopup(popupBig);
  // }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._data.link;
    this._element.querySelector('.card__title').textContent = this._data.name;
    this._element.querySelector('.card__image').dataset.name = this._data.name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', this._handleCardLike);
    this._element.querySelector('.card__delete-button').addEventListener('click', this._handleCardDelete);
    this._element.querySelector('.card__popup-button').addEventListener('click', this._handleCardClick);
  }

  _handleCardLike(evt) {
    evt.target.classList.toggle('card__like-button_event')
  };

  _handleCardDelete (evt) {
    evt.target.closest('.card').remove()
  };

}
