export class FormValidator {
  constructor (formSettings, formElement){
    this._set = formSettings;
    this._form = formElement;

    this._submitButton = this._form.querySelector(this._set.submitButtonSelector);
    this._inputs = Array.from(this._form.querySelectorAll(this._set.inputSelector));



  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._set.inputErrorClass);
    errorElement.classList.add(this._set.errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._set.inputErrorClass);
    errorElement.classList.remove(this._set.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement) {
    if (inputElement.validity.valid){
      this._hideInputError (inputElement);
    } else {
      this._showInputError (inputElement, inputElement.validationMessage);
    }
  }

  toggleButtonState () {
    if (!this._form.checkValidity()){
      this._submitButton.setAttribute ('disabled', '');
      this._submitButton.classList.add(this._set.inactiveButtonClass);
      this._submitButton.classList.remove('button');

    } else {
      this._submitButton.removeAttribute ('disabled');
      this._submitButton.classList.remove(this._set.inactiveButtonClass);
      this._submitButton.classList.add('button');
    };

  }

  resetErrors () {
    this._inputs.forEach((input) => {
      this._hideInputError (input);
    });
  }

  _setListeners (){
    this._inputs.forEach((input) => {
      input.addEventListener ('input', ()=> {
        this._checkInputValidity (input);
        this.toggleButtonState();
      })
    });
  }


  enableValidation () {
    this._form.addEventListener ('submit', (evt) => {
      evt.preventDefault()});
    this._setListeners ();
  }


}
