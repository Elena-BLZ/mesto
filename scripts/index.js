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
const popUp = page.querySelector('.popup');
const closeBtn = page.querySelector('.popup__close-btn');
const editForm = page.querySelector('.edit-frm');
const nameInput = editForm.querySelector('.edit-frm__item_type_name');
const jobInput = editForm.querySelector('.edit-frm__item_type_description');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__description');
const elementTemplate = page.querySelector('.element-template').content;
const elements = page.querySelector('.elements');

function addElement(card) {
  const newElement = elementTemplate.cloneNode(true);
  newElement.querySelector('.element__photo').src = card.link;
  newElement.querySelector('.element__name').innerText = card.name;

  elements.appendChild (newElement);
}

function renderInitialElements() {
  initialElements.forEach (addElement);
}

function openEditForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popUp.classList.add('popup_opened');
}

function closeEditForm() {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeEditForm();
}

editForm.addEventListener('submit', formSubmitHandler);
editBTn.addEventListener('click', openEditForm);
closeBtn.addEventListener('click', closeEditForm);

renderInitialElements();
