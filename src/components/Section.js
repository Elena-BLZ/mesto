export class Section {
  constructor({
    renderer
  }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(itemElement) {
    this._containerElement.prepend(itemElement);
  }
}
