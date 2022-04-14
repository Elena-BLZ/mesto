export class Card {
  constructor(
    cardData,
    cardTemplateSelector,
    hadlePhotoClick,
    handleDelClick,
    handleLikeClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData.id;
    this._owner = cardData.ownerId;
    this._me = cardData.myId;

    this._handleLikeClick = handleLikeClick;
    this._handlePhotoClick = hadlePhotoClick;
    this._handleDelClick = handleDelClick;

    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.element');

  }
  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  setLikeBtn = (isLiked) => {
    isLiked
    ? this._likeBtn.classList.add('element__like-btn_active')
    : this._likeBtn.classList.remove('element__like-btn_active');
  }

  setLikes (likes) {
    this._likes = likes;
    const likeCountElement = this._cardElement.querySelector ('.element__like-count');
    likeCountElement.textContent = likes.length;
  }

  isLiked () {
    return this._likes.some((like) => {return like._id===this._me})
  }

  createCardElement() {
    this._cardElement = this._template.cloneNode(true);
    this._likeBtn = this._cardElement.querySelector('.element__like-btn');
    this._delBtn = this._cardElement.querySelector('.element__del-btn');
    const photo = this._cardElement.querySelector('.element__photo');

    photo.src = this._link;
    photo.alt = this._name;
    this._cardElement.querySelector('.element__name').innerText = this._name;

    this.setLikes(this._likes);
    this.setLikeBtn(this.isLiked());
    this._likeBtn.addEventListener('click', () => this._handleLikeClick(this._id));

    if (this._owner===this._me) {
      this._delBtn.addEventListener('click', () => this._handleDelClick(this._id));
    }
    else{
      this._delBtn.style.display = 'none';
    }

    photo.addEventListener('click', () => this._handlePhotoClick());

    return this._cardElement;
  }
}
