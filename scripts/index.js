import {
  FormValidator
} from "./FormValidator.js";
import {
  Card
} from "./Card.js";
import {
  initialElements,
  validationSettings
} from "./initialData.js"

const page = document.querySelector('.page');
const profileEditBtn = page.querySelector('.profile__edit-btn');
const elementAddBtn = page.querySelector('.profile__add-btn');
const profilePopUp = page.querySelector('.popup_type_profile');
const elementPopUp = page.querySelector('.popup_type_element');
const picturePopUp = page.querySelector('.popup_type_picture');
const profileForm = page.querySelector('.edit-frm_type_profile');
const elementForm = page.querySelector('.edit-frm_type_element');
const nameInput = profileForm.querySelector('.edit-frm__item_type_name');
const jobInput = profileForm.querySelector('.edit-frm__item_type_description');
const placeInput = elementForm.querySelector('.edit-frm__item_type_place');
const linkInput = elementForm.querySelector('.edit-frm__item_type_link');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__description');
const elements = page.querySelector('.elements');
const bigPhoto = picturePopUp.querySelector('.popup__picture');
const caption = picturePopUp.querySelector('.popup__caption');
const profileFormValidator = new FormValidator(validationSettings, profileForm);
const elementFormValidator = new FormValidator(validationSettings, elementForm);

function renderElement(card, container) {
  container.prepend(createElement(card));
}

function createElement (card) {
  const newCard = new Card(card, '.element-template', openPicturePopup);
  return newCard.createCardElement();
}

function renderInitialElements() { //initialData.js
  initialElements.forEach((item) =>
    renderElement(item, elements)
  );
}

function openProfilePopUp() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  profileFormValidator.resetErrors();
  profileFormValidator.toggleButtonState();

  openPopUp(profilePopUp);
}

function openElementPopUp() {
  placeInput.value = '';
  linkInput.value = '';

  elementFormValidator.resetErrors();
  elementFormValidator.toggleButtonState();

  openPopUp(elementPopUp);
}

function openPopUp(popup) {
  document.addEventListener('keydown', closeByEscBtn);
  popup.classList.add('popup_opened');
}

function openPicturePopup(evt) {
  bigPhoto.src = evt.target.src;
  bigPhoto.alt = evt.target.alt;
  caption.textContent = evt.target.alt;
  openPopUp(picturePopUp);
}

function closePopUp(evt) {
  const popUp = document.querySelector('.popup_opened');
  popUp.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscBtn);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(evt);
}

function handleElementSubmit(evt) {
  evt.preventDefault();
  renderElement({
    name: placeInput.value,
    link: linkInput.value
  }, elements);
  closePopUp(evt);
}

function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopUp(evt);
  }
}

function closeByEscBtn(evt) {
  if (evt.key === 'Escape') {
    closePopUp(evt);
  }
}

function setPopUpsHandlers() {
  const popUps = Array.from(document.querySelectorAll('.popup'));
  popUps.forEach((item) => {
    setPopUpClosing(item)
  });
}

function setPopUpClosing(popUpItem) {
  const closeBtn = popUpItem.querySelector('.popup__close-btn');
  closeBtn.addEventListener('click', closePopUp);
  popUpItem.addEventListener('click', closeByOverlay)
}

profileForm.addEventListener('submit', handleProfileSubmit);
elementForm.addEventListener('submit', handleElementSubmit);
profileEditBtn.addEventListener('click', openProfilePopUp);
elementAddBtn.addEventListener('click', openElementPopUp)

profileFormValidator.enableValidation();
elementFormValidator.enableValidation();

renderInitialElements();
setPopUpsHandlers();
