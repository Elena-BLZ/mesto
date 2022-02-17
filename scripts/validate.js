const validationSettings = {
  formSelector: '.edit-frm',
  inputSelector: '.edit-frm__item',
  submitButtonSelector: '.edit-frm__save-btn',
  inactiveButtonClass: 'edit-frm__save-btn_disabled',
  inputErrorClass: 'edit-frm__item_invalid',
  errorClass: 'edit-frm__error-message_visible'
}
function handleFormSubmit (evt) {
  evt.preventDefault();
}

function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.classList.add(validationSettings.errorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement) {
  if (inputElement.validity.valid){
    hideInputError (formElement, inputElement);
  } else {
    showInputError (formElement, inputElement, inputElement.validationMessage);
  }
}

function toggleButtonState (formItem, buttonItem) {
  if (!formItem.checkValidity()){
    buttonItem.setAttribute ('disabled', '');
    buttonItem.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonItem.removeAttribute ('disabled');
    buttonItem.classList.remove(validationSettings.inactiveButtonClass);
  };

}
function setListeners (formItem, buttonItem){
  const inputs = Array.from(formItem.querySelectorAll(validationSettings.inputSelector));
  inputs.forEach((input) => {
    input.addEventListener ('input', ()=> {
      checkInputValidity (formItem, input);
      toggleButtonState(formItem, buttonItem);
    })
  });
}

function enableValidation (settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach ((form)=>{
    form.addEventListener ('submit', handleFormSubmit);
    const button = form.querySelector(settings.submitButtonSelector);
    toggleButtonState(form, button);
    setListeners (form, button);
  });
};




enableValidation (validationSettings);
