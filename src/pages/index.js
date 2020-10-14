import './index.css';
import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';

const sectionCards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template');
const openProfilePopup = document.querySelector('.profile__edit-button');
const openCardPopup = document.querySelector('.profile__add-button');
const closeButtonProfile = document.querySelector('#closeButtonProfile');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('#popupProfile');
const popupCards = document.querySelector('#popupCards');
const popupBig = document.querySelector('#popupBig');
const formProfile = document.querySelector('#formProfile');
const formCards = document.querySelector('#formCards');
export const inputName = document.querySelector('#name-input');
export const inputFeature = document.querySelector('#feature-input');
const inputPlace = document.querySelector('#place-input');
const inputLink = document.querySelector('#link-input');
const closeButtonCards = document.querySelector('#closeButtonCards');
const closeButtonBig = document.querySelector('#closeButtonBig');
const saveButtonProfile = document.querySelector('#saveButtonProfile');
const saveButtonCards = document.querySelector('#saveButtonCards');
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



const popupWithImage = new PopupWithImage(popupBig);

initialCards.forEach((item) => { // карточки из массива
  const card = new Card({data: item,
      handleCardClick: () => {
        popupWithImage.open(item);
      }
  },
    '#card-template');
  const cardElement = card.generateCard();
  sectionCards.append(cardElement);
});


const cardForm = new PopupWithForm({
  formSubmit: (item) => {
    const card = new Card({data: item,
      handleCardClick: () => {
        popupWithImage.open(item);
      }
    },
      '#card-template');
    const cardElement = card.generateCard();
    sectionCards.addItem(cardElement);
  }
}, popupCards);

const openCardForm = () => {
  formCards.reset();
  cardForm.open();
  cardForm.cleanError();
};

openCardPopup.addEventListener('click', openCardForm);

function addCard () {
  const cardValue = {};
    cardValue.link = inputLink.value;
    cardValue.name = inputPlace.value;
  const card = new Card({data: cardValue,
    handleCardClick: () => {
      popupWithImage.open(item);
    },
  },
  '#card-template');
  const cardElement = card.generateCard();
  sectionCards.prepend(cardElement);
}

function handleCardsFormSubmit (evt) {
  evt.preventDefault();
  addCard();
  cardForm.close();
}

formCards.addEventListener('submit', handleCardsFormSubmit);

const userInfo = new UserInfo({
  userName: nameProfile,
  userInfo: featureProfile,
});

const profileForm = new PopupWithForm({
  formSubmit: (item) => {
    userInfo.setUserInfo(item);
  }
}, popupProfile);


openProfilePopup.addEventListener('click', () => {
  formProfile.reset();
  const infoAuthor = userInfo.getUserInfo();
  inputName.value = infoAuthor.name;
  inputFeature.value = infoAuthor.info;
  profileForm.cleanError();
  profileForm.open();
})


function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  featureProfile.textContent = inputFeature.value;
  profileForm.close();
}
formProfile.addEventListener('submit', handleProfileFormSubmit);


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



/*
function openPopup(popupSelector) {
  popupSelector.classList.add('popup_open');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('click', handleOverlayClick);
}

function closePopup(popupSelector) {
  popupSelector.classList.remove('popup_open');
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
*/


// closeButtonProfile.addEventListener('click', function() {
//  closePopup(popupProfile);
// })

// closeButtonCards.addEventListener('click', function() {
//   closePopup(popupCards);
// })

// closeButtonBig.addEventListener('click', function() {
//   closePopup(popupBig);
// })
