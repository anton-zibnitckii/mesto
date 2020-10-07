import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const sectionCards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template');
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
const containerPopup = document.querySelector('.popup__container');
const saveButton = document.querySelector('.popup__save-button');
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

export function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('click', handleOverlayClick);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_open');
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('click', handleOverlayClick);
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

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template")
  const cardElement = card.generateCard();
  sectionCards.append(cardElement);
})

function addCard () {
  const cardValue = {};
    cardValue.link = inputLink.value;
    cardValue.name = inputPlace.value;
  const card = new Card(cardValue, "#card-template");
  const cardElement = card.generateCard();
  sectionCards.prepend(cardElement);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  saveDataInputProfileForm()
  closePopup(popupProfile);
}

function handleCardsFormSubmit (evt) {
  evt.preventDefault();
  addCard()
  closePopup(popupCards);
}

function cleanError() {

  document.querySelectorAll('.popup__span-error').forEach((span) => {
    span.classList.remove('popup__span-error_type_active');
    span.textContent = '';
  });

  document.querySelectorAll('.popup__input').forEach((input) => {
    if (!input.value) {
      saveButton.classList.add('popup__save-button_type_disabled');
      saveButton.setAttribute('disabled', 'true');
    } else {
      saveButton.classList.remove('popup__save-button_type_disabled');
      saveButton.removeAttribute('disabled');
    }
    input.classList.remove('popup__input_type_error');
  });
}

editButton.addEventListener('click', function () {
  setProfilePopupDataInput();
  openPopup(popupProfile);
  cleanError();
})

addButton.addEventListener('click', function () {
  openPopup(popupCards);
  formCards.reset();
  cleanError();
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

formProfile.addEventListener('submit', handleProfileFormSubmit);

formCards.addEventListener('submit', handleCardsFormSubmit);

function formValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    const validator = new FormValidator({
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__save-button',
      inactiveButtonClass: 'popup__save-button_type_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__span-error_type_active',
    }, form);
    validator.enableValidation();
  });
}

formValidation();
