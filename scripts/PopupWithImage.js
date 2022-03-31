import {
  Popup
} from './Popup.js';
export class PopupWithImage extends Popup {
  open = (name, link) => {
    const bigPhoto = this._popup.querySelector('.popup__picture');
    const caption = this._popup.querySelector('.popup__caption');
    bigPhoto.src = link;
    bigPhoto.alt = name;
    caption.textContent = name;
    super.open();
  }
}
