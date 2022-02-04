const page = document.querySelector('.page');
const editBTn = page.querySelector('.profile__edit-btn');
const addBtn = page.querySelector('.profile__add-btn');
const profilePopUp = page.querySelector('.popup_type_profile');
const elementPopUp = page.querySelector('.popup_type_element');
const picturePopUp = page.querySelector('.popup_type_picture');
const profileCloseBtn = profilePopUp.querySelector('.popup__close-btn');
const elementCloseBtn = elementPopUp.querySelector('.popup__close-btn');
const pictureCloseBtn = picturePopUp.querySelector('.popup__close-btn');
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

function addElement(card, container) {
  container.prepend(card);
}
<<<<<<< HEAD
=======
//elements.insertBefore(newElement, elements.firstChild);
>>>>>>> d792cfca52dd89c3138e693853dd02ec43cba061

function createCard(card) {
  const newElement = elementTemplate.cloneNode(true);
  const photo = newElement.querySelector('.element__photo')
  photo.src = card.link;
  photo.alt = card.name;
  newElement.querySelector('.element__name').innerText = card.name;

  newElement.querySelector('.element__like-btn').addEventListener('click', likeBtnHandler);
  newElement.querySelector('.element__del-btn').addEventListener('click', delBtnHandler);
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

function openPicturePopup (evt) {
  bigPhoto.src = evt.target.src;
  bigPhoto.alt = evt.target.alt;
  caption.textContent = evt.target.alt;
  openPopUp(picturePopUp);
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
  addElement (createCard({name: placeInput.value, link: linkInput.value }), elements);
  closePopUp (evt);
}

function likeBtnHandler (evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

function delBtnHandler (evt) {
  evt.target.closest('.element').remove();
}


profileForm.addEventListener('submit', profileSubmitHandler);
elementForm.addEventListener('submit', elementSubmitHandler);
editBTn.addEventListener('click', openProfilePopUp);
addBtn.addEventListener('click', openElementPopUp)
profileCloseBtn.addEventListener('click', closePopUp);
elementCloseBtn.addEventListener('click', closePopUp);
pictureCloseBtn.addEventListener('click', closePopUp);

renderInitialElements();
