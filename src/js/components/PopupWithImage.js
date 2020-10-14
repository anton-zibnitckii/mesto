import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor (popupSelector){
    super(popupSelector);
  }

  open(data) {
    const _imagePopup = this._popupSelector.querySelector('.popup-view__img');
    const _captionPopup = this._popupSelector.querySelector('.popup-view__caption');
    _imagePopup.src = data.link;
    _imagePopup.dataset.name = data.name;
    _captionPopup.textContent = data.name;
    super.open();
  }
}
