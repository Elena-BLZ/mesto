import {
  FormValidator
} from "../components/FormValidator.js";
import {
  Card
} from "../components/Card.js";
import {
  initialElements,
  validationSettings
} from "../components/initialData.js"
import {
  Section
} from "../components/Section.js";
import {
  PopupWithImage
} from "../components/PopupWithImage.js";
import {
  PopupWithForm
} from "../components/PopupWithForm.js";
import {
  UserInfo
} from "../components/UserInfo.js";

import './index.css';



const page = document.querySelector('.page');
const profileEditBtn = page.querySelector('.profile__edit-btn');
const elementAddBtn = page.querySelector('.profile__add-btn');

const profileForm = page.querySelector('.edit-frm_type_profile');
const elementForm = page.querySelector('.edit-frm_type_element');

const placeInput = elementForm.querySelector('.edit-frm__item_type_place');
const linkInput = elementForm.querySelector('.edit-frm__item_type_link');
const nameInput = profileForm.querySelector('.edit-frm__item_type_name');
const jobInput = profileForm.querySelector('.edit-frm__item_type_description');


const profileFormValidator = new FormValidator(validationSettings, profileForm);
const elementFormValidator = new FormValidator(validationSettings, elementForm);

function renderElement(card, container) {
  container.prepend(createElement(card));
}

function createElement(card) {
  const newCard = new Card(card, '.element-template', () => {
    picturePopUp.open(card.name, card.link)
  });
  return newCard.createCardElement();
}

function openProfilePopUp() {
  const values = userInfo.getUserInfo();
  nameInput.value = values.name;
  jobInput.value = values.job;

  profileFormValidator.resetErrors();
  profileFormValidator.toggleButtonState();

  profilePopUp.open();
}

function openElementPopUp() {
  placeInput.value = '';
  linkInput.value = '';

  elementFormValidator.resetErrors();
  elementFormValidator.toggleButtonState();

  elementPopUp.open();
}

function handleProfileSubmit(data) {
  userInfo.setUserInfo(data);
  profilePopUp.close();
}

function handleElementSubmit(data) {
  const cardElement = createElement({
    name: data.place,
    link: data.link
  });
  cardSection.addItem(cardElement);
  elementPopUp.close();
}

profileEditBtn.addEventListener('click', openProfilePopUp);
elementAddBtn.addEventListener('click', openElementPopUp);

profileFormValidator.enableValidation();
elementFormValidator.enableValidation();

const cardSection = new Section({
  items: initialElements,
  renderer: renderElement
}, '.elements');
cardSection.renderItems();

const picturePopUp = new PopupWithImage('.popup_type_picture');
picturePopUp.setEventListeners();

const profilePopUp = new PopupWithForm('.popup_type_profile', handleProfileSubmit);
profilePopUp.setEventListeners();
const elementPopUp = new PopupWithForm('.popup_type_element', handleElementSubmit)
elementPopUp.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description'
});
