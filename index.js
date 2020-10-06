import { Card } from './Card.js';
const sectionCards = document.querySelector('.cards');
/* const cardTemplate = document.querySelector('#card-template').content; */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonProfile = document.querySelector('#closeButtonProfile');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('#popupProfile');
const popupCards = document.querySelector('#popupCards');
const popupBig = document.querySelector('#popupBig');
const formProfile = document.querySelector('#formProfile');
const formCards = document.querySelector('#formCards');
const inputName = document.querySelector('#name-input');
const inputFeature = document.querySelector('#feature-input');
const inputPlace = document.querySelector('#place-input');
const inputLink = document.querySelector('#link-input');
const closeButtonCards = document.querySelector('#closeButtonCards');
const closeButtonBig = document.querySelector('#closeButtonBig');
const saveButton = document.querySelector('.popup__save-button');
const containerPopup = document.querySelector('.popup__container')
export const imagePopup = document.querySelector('.popup-view__img');
export const captionPopup = document.querySelector('.popup-view__caption');
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
const nameProfile = document.querySelector('.profile__name');
const featureProfile = document.querySelector('.profile__feature');
const formObj = {
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span-error_type_active',
}

const validationForOpen = (formElement, formObj) => {
  const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));
  const buttonElement = formElement.querySelector(formObj.submitButtonSelector);
  toggleSubmitButtonState(inputList, buttonElement, formObj);
  inputList.forEach((inputElement) => {
    hideInputError(formElement,inputElement, formObj);
    toggleSubmitButtonState(inputList, buttonElement, formObj);
  });
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('click', handleOverlayClick);
  validationForOpen(formProfile, formObj);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_open');
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('click', handleOverlayClick);
  validationForOpen(formCards, formObj);
}

function handleEscClose(evt) {
  const isPopupOpen = document.querySelector('.popup_open');
  if (evt.key === 'Escape') {
    closePopup(isPopupOpen);
  }
}
function handleOverlayClick(evt) {
  const isPopupOpen = document.querySelector('.popup_open');
  if (evt.target.classList.contains('popup_open')) {
    closePopup(isPopupOpen);
  }
}

function setProfilePopupDataInput () {
  inputName.value = nameProfile.textContent;
  inputFeature.value = featureProfile.textContent;
}

function saveDataInputProfileForm () {
  nameProfile.textContent = inputName.value;
  featureProfile.textContent = inputFeature.value;
}
/*
function activeLike (evt) {
  evt.target.classList.toggle('card__like-button_event');
}

function deleteCards (evt) {
  evt.target.closest('.card').remove();
}
*/
/*
function openPopupImage (evt) {
  const item = evt.target;
  imagePopup.src = item.src;
  imagePopup.alt = item.dataset.name;
  captionPopup.textContent = item.dataset.name;
  openPopup(popupBig);
}
*/

/*
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
*/

function addCard () {
  const card = new Card(inputPlace.value, inputLink.value);
  const cardElement = card.generateCard();
  sectionCards.prepend(cardElement);

}

function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  saveDataInputProfileForm()
  formProfile.reset();
  closePopup(popupProfile);
}

function formSubmitHandlerCards (evt) {
  evt.preventDefault();
  addCard()
  formCards.reset();
  closePopup(popupCards);
}


initialCards.forEach((item) => {
  const card = new Card(item.name, item.link)
  const cardElement = card.generateCard();
  sectionCards.append(cardElement);
})

editButton.addEventListener('click', function () {
  setProfilePopupDataInput();
  openPopup(popupProfile);
})

addButton.addEventListener('click', function () {
  openPopup(popupCards);
})

closeButtonProfile.addEventListener('click', function() {
  closePopup(popupProfile);
})

closeButtonCards.addEventListener('click', function() {
  closePopup(popupCards);
})

closeButtonBig.addEventListener('click', function() {
  closePopup(popupBig);
})

formProfile.addEventListener('submit', formSubmitHandlerProfile)

formCards.addEventListener('submit', formSubmitHandlerCards)
