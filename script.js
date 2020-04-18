const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formPopup = popup.querySelector('.popup__form');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = formPopup.querySelector('.popup__save-button');
let nameProfile = document.querySelector('.profile__name');
let featureProfile = document.querySelector('.profile__feature');
let namePopup = formPopup.querySelector('.popup__input_name');
let featurePopup = formPopup.querySelector('.popup__input_feature');

function editForm() {
  popup.classList.add('popup_open');
  namePopup.value = nameProfile.textContent;
  featurePopup.value = featureProfile.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = namePopup.value;
  featureProfile.textContent = featurePopup.value;
}

function closePopup(){
  popup.classList.toggle('popup_open');
}

editButton.addEventListener('click', editForm);
formPopup.addEventListener('submit', formSubmitHandler);
formPopup.addEventListener('submit', closePopup);
closeButton.addEventListener('click', closePopup);
