export class Section {
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item, this._containerElement);
    });
  }

  addItem(itemElement) {
    this._containerElement.prepend(itemElement);
  }
}
