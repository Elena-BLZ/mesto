export class UserInfo {
  constructor({
    nameSelector,
    jobSelector,
    avatarSelector
  }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);

  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
    return userData;
  }

  setUserInfo({
    name,
    description,
    avatar
  }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = description;
    avatar ? this._avatarElement.src = avatar : {} ;
  }
}
