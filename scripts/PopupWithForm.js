import {
  Popup
} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._submit = handleFormSubmit;
    this._form = this._popup.querySelector('.edit-frm');
  }

  _getInputValues() {
    const data = {};
    const inputs = [...this._popup.querySelectorAll('.edit-frm__item')];
    inputs.forEach(input => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._submit(this._getInputValues())
    });
  }

  close = () => {
    super.close();
    this._form.reset();
  }

}
