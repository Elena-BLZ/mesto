let page = document.querySelector('.page');
let editBTn = page.querySelector('.profile__edit-btn');
let popUp = page.querySelector('.popup');
let closeBtn = page.querySelector('.popup__close-btn');
let editForm = page.querySelector('.edit-frm');
let nameInput = editForm.querySelector('.edit-frm__name');
let jobInput = editForm.querySelector('.edit-frm__description');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__description');

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
