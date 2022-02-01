const initialElements = [
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

const page = document.querySelector('.page');
const editBTn = page.querySelector('.profile__edit-btn');
const addBtn = page.querySelector('.profile__add-btn');
const profilePopUp = page.querySelector('.popup_type_profile');
const elementPopUp = page.querySelector('.popup_type_element');
const profileCloseBtn = profilePopUp.querySelector('.popup__close-btn');
const elementCloseBtn = elementPopUp.querySelector('.popup__close-btn');
const profileForm = page.querySelector('.edit-frm_type_profile');
const elementForm = page.querySelector('.edit-frm_type_element');
const nameInput = profileForm.querySelector('.edit-frm__item_type_name');
const jobInput = profileForm.querySelector('.edit-frm__item_type_description');
const placeInput = elementForm.querySelector('.edit-frm__item_type_name');
const linkInput = elementForm.querySelector('.edit-frm__item_type_description');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__description');
const elementTemplate = page.querySelector('.element-template').content;
const elements = page.querySelector('.elements');


function addElement(card) {
  const newElement = elementTemplate.cloneNode(true);
  newElement.querySelector('.element__photo').src = card.link;
  newElement.querySelector('.element__name').innerText = card.name;

  elements.insertBefore(newElement, elements.firstChild);
}

function renderInitialElements() {
  initialElements.forEach (addElement);
}

function openProfilePopUp() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopUp (profilePopUp);
}

function openElementPopUp() {
  placeInput.value = '';
  linkInput.value = '';
  openPopUp (elementPopUp);
}


function openPopUp(popup) {
  popup.classList.add('popup_opened');
}

function closePopUp(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function profileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(evt);
}

function elementSubmitHandler (evt) {
  evt.preventDefault();
  addElement ({name: placeInput.value, link: linkInput.value });
  closePopUp (evt);
}

profileForm.addEventListener('submit', profileSubmitHandler);
elementForm.addEventListener('submit', elementSubmitHandler);
editBTn.addEventListener('click', openProfilePopUp);
addBtn.addEventListener('click', openElementPopUp)
profileCloseBtn.addEventListener('click', closePopUp);
elementCloseBtn.addEventListener('click', closePopUp)

renderInitialElements();
