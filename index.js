let page = document.querySelector('.page');
let editBTn = page.querySelector('.profile__edit-btn');
let popUp = page.querySelector('.popup');
let closeBtn = page.querySelector('.popup__close-btn');
let editForm = page.querySelector('.edit-frm');
let nameInput = editForm.querySelector('.edit-frm__name');
let jobInput = editForm.querySelector('.edit-frm__description');


function openEditForm() {
  let name = page.querySelector('.profile__name');
  let job = page.querySelector('.profile__description');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;

  popUp.classList.add('popup_opened');
}

function closeEditForm() {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let name = page.querySelector('.profile__name');
  let job = page.querySelector('.profile__description');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closeEditForm();
}


editForm.addEventListener('submit', formSubmitHandler);

editBTn.addEventListener('click', openEditForm);
closeBtn.addEventListener('click', closeEditForm);
