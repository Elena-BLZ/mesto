import {
  Popup
} from './Popup.js';

import {bigPhoto, caption} from '../utils/Constants.js'

export class PopupWithImage extends Popup {
  open = (name, link) => {
    bigPhoto.src = link;
    bigPhoto.alt = name;
    caption.textContent = name;
    super.open();
  }
}
