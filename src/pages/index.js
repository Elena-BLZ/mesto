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
import {
  api
} from "../components/Api.js";

import './index.css';

import {
  profileEditBtn,
  elementAddBtn,
  avatarBtn,
  profileForm,
  elementForm,
  avatarForm,
  placeInput,
  linkInput,
  nameInput,
  jobInput,
  avatarInput,
  avatar,
  loadingText
} from '../components/Constants.js'

let userId;

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

api.getProfile()
  .then(res => {
    userInfo.setUserInfo({
      name: res.name,
      description: res.about,
      avatar: res.avatar
    });
    userId = res._id;
  })
  .then(() => {
    api.getInitialCards()
      .then(cardList => {
        cardList.forEach(
          data => {
            const cardElement = createElement(configElementData(data));
            cardSection.addItem(cardElement);
          }
        )
      });
  });

const profileFormValidator = new FormValidator(validationSettings, profileForm);
const elementFormValidator = new FormValidator(validationSettings, elementForm);
const avatarFormValidator = new FormValidator(validationSettings, avatarForm);


function renderElement(card, container) {
  container.prepend(createElement(card));
}

function createElement(card) {
  const newCard = new Card(
    card,
    '.element-template',
    () => { //open picture
      picturePopUp.open(card.name, card.link)
    },
    (id) => { //del card
      confirmPopUp.open();
      confirmPopUp.changeSubmit(() => {
        api.deleteCard(id)
          .then(res => {
            newCard.deleteCard();
            confirmPopUp.close();
          })
      })
    },
    (id) => { //(dis)like card
      if (newCard.isLiked()) {
        api.deleteLike(id)
          .then((res) => {
            newCard.setLikes(res.likes);
            newCard.setLikeBtn(false);
          })
      } else {
        api.addLike(id)
          .then((res) => {
            newCard.setLikes(res.likes);
            newCard.setLikeBtn(true);
          })
      };
    }
  );
  return newCard.createCardElement();
}

function configElementData(data) {
  return {
    name: data.name,
    link: data.link,
    likes: data.likes,
    id: data._id,
    ownerId: data.owner._id,
    myId: userId
  }
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

function openAvatarPopUp() {
  avatarInput.value = avatar.src;

  avatarFormValidator.resetErrors();
  avatarFormValidator.toggleButtonState();

  avatarPopUp.open();
}

function handleProfileSubmit(data) {
  profilePopUp.loading(true, loadingText);
  api.editProfile(data.name, data.description)
    .then((res) => {
      const data = {
        name: res.name,
        description: res.about,
        avatar: res.avatar
      };
      userInfo.setUserInfo(data);
      profilePopUp.close();
    })
    .finally(() => {
      profilePopUp.loading(false);
    })
}

function handleElementSubmit(data) {
  elementPopUp.loading(true, loadingText);
  api.addCard(data.place, data.link)
    .then(res => {
      const cardElement = createElement(configElementData(res));
      cardSection.addItem(cardElement);
      elementPopUp.close();
    })
    .finally(() => {
      elementPopUp.loading(false);
    })
}

function handleAvatarSubmit(data) {
  avatarPopUp.loading(true, loadingText);
  console.log('data', data);
  api.editAvatar(data.link)
    .then(res => {
      console.log('res', res);
      avatar.src = res.avatar;
      avatarPopUp.close();
    })
    .finally(() => {
      avatarPopUp.loading(false);
    })
}

profileEditBtn.addEventListener('click', openProfilePopUp);
elementAddBtn.addEventListener('click', openElementPopUp);
avatarBtn.addEventListener('click', openAvatarPopUp);

profileFormValidator.enableValidation();
elementFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const cardSection = new Section({
  items: [],
  renderer: renderElement
}, '.elements');
cardSection.renderItems();

const picturePopUp = new PopupWithImage('.popup_type_picture');
picturePopUp.setEventListeners();

const profilePopUp = new PopupWithForm('.popup_type_profile', handleProfileSubmit);
profilePopUp.setEventListeners();

const elementPopUp = new PopupWithForm('.popup_type_element', handleElementSubmit)
elementPopUp.setEventListeners();

const confirmPopUp = new PopupWithForm('.popup_type_confirm');
confirmPopUp.setEventListeners();

const avatarPopUp = new PopupWithForm('.popup_type_avatar', handleAvatarSubmit)
avatarPopUp.setEventListeners();