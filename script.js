const sectionCards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const titlePopup = document.querySelector('.popup__title');
const formPopup = document.querySelector('.popup__form');
const inputUp = document.querySelector('#up');
const inputDown = document.querySelector('#down');
const saveButton = formPopup.querySelector('.popup__save-button');
const containerPopup = document.querySelector('.popup__container')
const imagePopup = document.querySelector('.popup__image');
const captionPopup = document.querySelector('.popup__caption');
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
let nameProfile = document.querySelector('.profile__name');
let featureProfile = document.querySelector('.profile__feature');

function openClosePopup(popupElement, popupMod) {
  popupElement.classList.toggle(popupMod);
}

function setTitle (text) {
  titlePopup.textContent = text;
}

function setUpInputAtr (name, item) {
  inputUp.setAttribute(name, item);
}

function setDownInputAtr (name, item) {
  inputDown.setAttribute(name, item);
}

function setEditPopupDataInput () {
  inputUp.value = nameProfile.textContent;
  inputDown.value = featureProfile.textContent;
}

function clearPopupInputEdit (val) {
  inputUp.value = val;
  inputDown.value = val;
}

function clearPopupInputAdd (atr) {
  inputUp.removeAttribute(atr);
  inputDown.removeAttribute(atr);
}

function saveDataInputEditForm () {
  nameProfile.textContent = inputUp.value;
  featureProfile.textContent = inputDown.value;
}

function activeLike (evt) {
  evt.target.classList.toggle('element__like-button_event');
}

function deleteCards (evt) {
  evt.target.closest('.card').remove();
}

function removePopupElement (elem, mod) {
  elem.classList.add(mod);
}

function addPopupElement (elem, mod) {
  elem.classList.remove(mod);
}

function openPopupImage (evt) {
  openClosePopup(popup, 'popup_open');
  addPopupElement(imagePopup, 'popup__image_hide');
  addPopupElement(captionPopup, 'popup__caption_hide');
  removePopupElement(containerPopup, 'popup__container_image');
  removePopupElement(formPopup, 'popup__form_hide');
  removePopupElement(saveButton, 'popup__save-button_hide');
  removePopupElement(titlePopup, 'popup__title_hide');
  const item = evt.target;
  imagePopup.src = item.src;
  imagePopup.alt = item.dataset.name;
  captionPopup.textContent = item.dataset.name
}


function loadCards (name, url) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = url;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').dataset.name = name;
  cardElement.querySelector('.card__like-button').addEventListener('click', activeLike);
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCards);
  cardElement.querySelector('.card__popup-button').addEventListener('click', openPopupImage);
  return cardElement;
}

function addCard () {
  sectionCards.prepend(loadCards(inputUp.value, inputDown.value));
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  if (titlePopup.textContent === 'Редактировать профиль') {
    saveDataInputEditForm();
  } else if (titlePopup.textContent === 'Новое место') {
    addCard();
  }
  clearPopupInputAdd('placeholder');
  clearPopupInputEdit('');
  openClosePopup(popup, 'popup_open');
}


initialCards.forEach(function (item) {
  sectionCards.append(loadCards(item.name, item.link));
})

editButton.addEventListener('click', function () {
  openClosePopup(popup, 'popup_open');
  removePopupElement(imagePopup, 'popup__image_hide');
  removePopupElement(captionPopup, 'popup__caption_hide');
  addPopupElement(containerPopup, 'popup__container_image');
  addPopupElement(formPopup, 'popup__form_hide');
  addPopupElement(saveButton, 'popup__save-button_hide');
  addPopupElement(titlePopup, 'popup__title_hide');
  setTitle('Редактировать профиль');
  setUpInputAtr('name', 'name');
  setDownInputAtr('name', 'feature');
  setEditPopupDataInput();
})

addButton.addEventListener('click', function () {
  openClosePopup(popup, 'popup_open');
  removePopupElement(imagePopup, 'popup__image_hide');
  removePopupElement(captionPopup, 'popup__caption_hide');
  addPopupElement(containerPopup, 'popup__container_image');
  addPopupElement(formPopup, 'popup__form_hide');
  addPopupElement(saveButton, 'popup__save-button_hide');
  addPopupElement(titlePopup, 'popup__title_hide');
  setTitle('Новое место');
  setUpInputAtr('name', 'name');
  setDownInputAtr('name', 'url');
  setUpInputAtr('placeholder', 'Название');
  setDownInputAtr('placeholder', 'Ссылка на картинку');
})

closeButton.addEventListener('click', function() {
  openClosePopup(popup, 'popup_open');
  clearPopupInputAdd('placeholder');
  clearPopupInputEdit('');

})

formPopup.addEventListener('submit', formSubmitHandler);


