export class UserInfo {
  constructor({
    nameSelector,
    jobSelector
  }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
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
    description
  }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = description;
  }
}
