export default class UserInfo {
  constructor({ userName, userInfo }) {
    this._name = userName;
    this._feature = userInfo;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._feature.textContent,
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._feature.textContent = data.info;
  }
}
