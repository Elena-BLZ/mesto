const page = document.querySelector('.page');
const editBTn = page.querySelector('.profile__edit-btn');
const addBtn = page.querySelector('.profile__add-btn');
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
const elementTemplate = page.querySelector('.element-template').content;
const elements = page.querySelector('.elements');
const bigPhoto = picturePopUp.querySelector('.popup__picture');
const caption = picturePopUp.querySelector('.popup__caption');
const profileSubmitBtn = profileForm.querySelector('.edit-frm__save-btn');
const elementSubmitBtn = elementForm.querySelector('.edit-frm__save-btn');


function addElement(card, container) {
  container.prepend(card);
}

function createCard(card) {
  const newElement = elementTemplate.cloneNode(true);
  const photo = newElement.querySelector('.element__photo')
  photo.src = card.link;
  photo.alt = card.name;
  newElement.querySelector('.element__name').innerText = card.name;

  newElement.querySelector('.element__like-btn').addEventListener('click', handleLikeBtn);
  newElement.querySelector('.element__del-btn').addEventListener('click', handleDelBtn);
  photo.addEventListener('click', openPicturePopup);

  return newElement;
}

function renderInitialElements() {//initialData.js
  initialElements.forEach ((item) =>
    addElement(createCard(item), elements)
  ); }

function openProfilePopUp() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  hideInputError(profileForm, nameInput);
  hideInputError(profileForm, jobInput);
  toggleButtonState (profileForm, profileSubmitBtn);
  openPopUp (profilePopUp);
}

function openElementPopUp() {
  placeInput.value = '';
  linkInput.value = '';
  hideInputError (elementForm, placeInput);
  hideInputError (elementForm, linkInput);
  toggleButtonState (elementForm, elementSubmitBtn);
  openPopUp (elementPopUp);
}

function openPopUp(popup) {
  document.addEventListener('keydown', closeByEscBtn);
  popup.classList.add('popup_opened');
}

function openPicturePopup (evt) {
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

function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(evt);
}

function handleElementSubmit (evt) {
  evt.preventDefault();
  addElement (createCard({name: placeInput.value, link: linkInput.value }), elements);
  closePopUp (evt);
}

function handleLikeBtn (evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

function handleDelBtn (evt) {
  evt.target.closest('.element').remove();
}

function closeByOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    closePopUp (evt);
  }
}

function closeByEscBtn (evt) {
  if (evt.key === 'Escape') {
    closePopUp (evt);
  }
}

function setPopUpsHandlers () {
  const popUps = Array.from (document.querySelectorAll('.popup'));
  popUps.forEach((item)=>{setPopUpClosing(item)});
}

function setPopUpClosing (popUpItem) {
  const closeBtn = popUpItem.querySelector('.popup__close-btn');
  closeBtn.addEventListener('click', closePopUp);
  popUpItem.addEventListener('click', closeByOverlay)
}

profileForm.addEventListener('submit', handleProfileSubmit);
elementForm.addEventListener('submit', handleElementSubmit);
editBTn.addEventListener('click', openProfilePopUp);
addBtn.addEventListener('click', openElementPopUp)

renderInitialElements();
setPopUpsHandlers();
