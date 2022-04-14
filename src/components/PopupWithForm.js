import {
  Popup
} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._submit = handleFormSubmit;
    this._form = this._popup.querySelector('.edit-frm');
    this._saveButton = this._form.querySelector('.edit-frm__save-btn');
    this._buttonText = this._saveButton.textContent;
  }

  _getInputValues() {
    const data = {};
    const inputs = [...this._popup.querySelectorAll('.edit-frm__item')];
    inputs.forEach(input => {
      data[input.name] = input.value;
    });
    return data;
  }

  changeSubmit (newSubmit) {
    this._submit = newSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submit(this._getInputValues())
    });
  }

  close = () => {
    super.close();
    this._form.reset();
  }

  loading (isLoading, text) {
    if (isLoading) {
      this._saveButton.textContent = text;
    }
    else {
      this._saveButton.textContent = this._buttonText;
    }
  }
}
