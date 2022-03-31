export class Card {
  constructor(cardData, cardTemplateSelector, hadlePhotoClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handlePhotoClick = hadlePhotoClick;
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.element');
  }

  _handleLikeBtn = () => {
    this._likeBtn.classList.toggle('element__like-btn_active');
  }

  _handleDelBtn = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  createCardElement() {
    this._cardElement = this._template.cloneNode(true);
    this._likeBtn = this._cardElement.querySelector('.element__like-btn');
    this._delBtn = this._cardElement.querySelector('.element__del-btn');
    const photo = this._cardElement.querySelector('.element__photo')

    photo.src = this._link;
    photo.alt = this._name;
    this._cardElement.querySelector('.element__name').innerText = this._name;

    this._likeBtn.addEventListener('click', this._handleLikeBtn);
    this._delBtn.addEventListener('click', this._handleDelBtn);
    photo.addEventListener('click', () => this._handlePhotoClick());

    return this._cardElement;
  }
}
